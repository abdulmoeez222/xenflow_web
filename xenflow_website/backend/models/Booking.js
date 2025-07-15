const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ]
    },
    company: {
        type: String,
        trim: true,
        maxlength: [100, 'Company name cannot exceed 100 characters'],
        default: ''
    },
    date: {
        type: String,
        required: [true, 'Date is required'],
        validate: {
            validator: function(v) {
                // Check if date is in the future
                const selectedDate = new Date(v);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return selectedDate >= today;
            },
            message: 'Booking date must be in the future'
        }
    },
    time: {
        type: String,
        required: [true, 'Time is required'],
        enum: {
            values: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
            message: 'Please select a valid time slot'
        }
    },
    purpose: {
        type: String,
        required: [true, 'Meeting purpose is required'],
        enum: {
            values: ['consultation', 'demo', 'partnership', 'project', 'support'],
            message: 'Please select a valid meeting purpose'
        }
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending'
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    notes: {
        type: String,
        trim: true,
        maxlength: [500, 'Notes cannot exceed 500 characters'],
        default: ''
    },
    ipAddress: {
        type: String,
        trim: true
    },
    userAgent: {
        type: String,
        trim: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Index for better query performance
bookingSchema.index({ email: 1 });
bookingSchema.index({ date: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ timestamp: -1 });
bookingSchema.index({ date: 1, time: 1 }); // For checking availability

// Virtual for formatted date and time
bookingSchema.virtual('formattedDateTime').get(function() {
    const date = new Date(this.date);
    return `${date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })} at ${this.time}`;
});

// Virtual for meeting duration
bookingSchema.virtual('duration').get(function() {
    return '60 minutes';
});

// Virtual for purpose display name
bookingSchema.virtual('purposeDisplay').get(function() {
    const purposeMap = {
        'consultation': 'General Consultation',
        'demo': 'Product Demo',
        'partnership': 'Partnership Discussion',
        'project': 'Project Discussion',
        'support': 'Technical Support'
    };
    return purposeMap[this.purpose] || this.purpose;
});

// Pre-save middleware to sanitize data
bookingSchema.pre('save', function(next) {
    // Remove any HTML tags from text fields
    if (this.name) {
        this.name = this.name.replace(/<[^>]*>/g, '');
    }
    if (this.company) {
        this.company = this.company.replace(/<[^>]*>/g, '');
    }
    if (this.notes) {
        this.notes = this.notes.replace(/<[^>]*>/g, '');
    }
    next();
});

// Static method to get recent bookings
bookingSchema.statics.getRecentBookings = function(limit = 10) {
    return this.find()
        .sort({ timestamp: -1 })
        .limit(limit)
        .select('name email company date time purpose status timestamp');
};

// Static method to get bookings by status
bookingSchema.statics.getBookingsByStatus = function(status) {
    return this.find({ status })
        .sort({ date: 1, time: 1 })
        .select('name email company date time purpose');
};

// Static method to check availability
bookingSchema.statics.checkAvailability = function(date, time) {
    return this.findOne({
        date: date,
        time: time,
        status: { $in: ['pending', 'confirmed'] }
    });
};

// Static method to get bookings for a specific date
bookingSchema.statics.getBookingsForDate = function(date) {
    return this.find({
        date: date,
        status: { $in: ['pending', 'confirmed'] }
    }).sort({ time: 1 });
};

// Instance method to confirm booking
bookingSchema.methods.confirm = function() {
    this.status = 'confirmed';
    return this.save();
};

// Instance method to cancel booking
bookingSchema.methods.cancel = function() {
    this.status = 'cancelled';
    return this.save();
};

// Instance method to complete booking
bookingSchema.methods.complete = function() {
    this.status = 'completed';
    return this.save();
};

// Instance method to add notes
bookingSchema.methods.addNotes = function(notes) {
    this.notes = notes;
    return this.save();
};

module.exports = mongoose.model('Booking', bookingSchema); 