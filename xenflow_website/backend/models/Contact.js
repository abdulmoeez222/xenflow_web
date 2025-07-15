const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
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
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        minlength: [10, 'Message must be at least 10 characters long'],
        maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied', 'archived'],
        default: 'new'
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
contactSchema.index({ email: 1 });
contactSchema.index({ timestamp: -1 });
contactSchema.index({ status: 1 });

// Virtual for formatted date
contactSchema.virtual('formattedDate').get(function() {
    return this.timestamp.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
});

// Pre-save middleware to sanitize data
contactSchema.pre('save', function(next) {
    // Remove any HTML tags from text fields
    if (this.name) {
        this.name = this.name.replace(/<[^>]*>/g, '');
    }
    if (this.company) {
        this.company = this.company.replace(/<[^>]*>/g, '');
    }
    if (this.message) {
        this.message = this.message.replace(/<[^>]*>/g, '');
    }
    next();
});

// Static method to get recent contacts
contactSchema.statics.getRecentContacts = function(limit = 10) {
    return this.find()
        .sort({ timestamp: -1 })
        .limit(limit)
        .select('name email company message timestamp status');
};

// Static method to get contacts by status
contactSchema.statics.getContactsByStatus = function(status) {
    return this.find({ status })
        .sort({ timestamp: -1 })
        .select('name email company message timestamp');
};

// Instance method to mark as read
contactSchema.methods.markAsRead = function() {
    this.status = 'read';
    return this.save();
};

// Instance method to mark as replied
contactSchema.methods.markAsReplied = function() {
    this.status = 'replied';
    return this.save();
};

// Instance method to archive
contactSchema.methods.archive = function() {
    this.status = 'archived';
    return this.save();
};

module.exports = mongoose.model('Contact', contactSchema); 