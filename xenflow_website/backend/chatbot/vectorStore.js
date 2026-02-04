/**
 * Vector Store Module
 * Manages vector storage and similarity search using SQLite
 * 
 * Uses better-sqlite3 for local, fast vector storage
 * Implements cosine similarity search for RAG retrieval
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const { generateEmbedding } = require('./embeddings');
const { getAllChunks } = require('./contentIngestion');

// Database path
const DB_PATH = path.join(__dirname, '../data/chatbot_vectors.db');

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

let db = null;

/**
 * Initialize the database and create tables
 */
function initializeDatabase() {
  if (db) {
    return db;
  }

  try {
    db = new Database(DB_PATH);
    
    // Create chunks table
    db.exec(`
      CREATE TABLE IF NOT EXISTS chunks (
        id TEXT PRIMARY KEY,
        text TEXT NOT NULL,
        type TEXT NOT NULL,
        metadata TEXT,
        embedding TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create index for faster searches
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_type ON chunks(type)
    `);

    console.log('✅ Vector store database initialized');
    return db;
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}

/**
 * Store embedding as JSON string in SQLite
 * SQLite doesn't have native vector types, so we store as JSON
 * @param {string} id - Chunk ID
 * @param {string} text - Chunk text
 * @param {string} type - Chunk type
 * @param {Object} metadata - Additional metadata
 * @param {Array<number>} embedding - Embedding vector
 */
function storeChunk(id, text, type, metadata, embedding) {
  if (!db) {
    initializeDatabase();
  }

  const stmt = db.prepare(`
    INSERT OR REPLACE INTO chunks (id, text, type, metadata, embedding)
    VALUES (?, ?, ?, ?, ?)
  `);

  stmt.run(
    id,
    text,
    type,
    JSON.stringify(metadata),
    JSON.stringify(embedding)
  );
}

/**
 * Get chunk by ID
 * @param {string} id - Chunk ID
 * @returns {Object|null} Chunk data with embedding
 */
function getChunk(id) {
  if (!db) {
    initializeDatabase();
  }

  const stmt = db.prepare('SELECT * FROM chunks WHERE id = ?');
  const row = stmt.get(id);
  
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    text: row.text,
    type: row.type,
    metadata: JSON.parse(row.metadata || '{}'),
    embedding: JSON.parse(row.embedding || '[]')
  };
}

/**
 * Get all chunks
 * @returns {Array} All chunks
 */
function getAllStoredChunks() {
  if (!db) {
    initializeDatabase();
  }

  const stmt = db.prepare('SELECT * FROM chunks');
  const rows = stmt.all();
  
  return rows.map(row => ({
    id: row.id,
    text: row.text,
    type: row.type,
    metadata: JSON.parse(row.metadata || '{}'),
    embedding: JSON.parse(row.embedding || '[]')
  }));
}

/**
 * Search for similar chunks using cosine similarity
 * @param {Array<number>} queryEmbedding - Query embedding vector
 * @param {number} topK - Number of results to return (default: 5)
 * @param {string|null} typeFilter - Optional type filter
 * @returns {Array} Top K similar chunks with similarity scores
 */
function searchSimilar(queryEmbedding, topK = 5, typeFilter = null) {
  if (!db) {
    initializeDatabase();
  }

  const { cosineSimilarity } = require('./embeddings');
  const allChunks = getAllStoredChunks();
  
  if (allChunks.length === 0) {
    return [];
  }
  
  // Filter by type if specified
  const filteredChunks = typeFilter
    ? allChunks.filter(chunk => chunk.type === typeFilter)
    : allChunks;

  // Calculate similarity scores
  const scoredChunks = filteredChunks.map(chunk => {
    if (!chunk.embedding || chunk.embedding.length === 0) {
      return { ...chunk, similarity: 0 };
    }

    const similarity = cosineSimilarity(queryEmbedding, chunk.embedding);
    return {
      ...chunk,
      similarity
    };
  });

  // Sort by similarity (descending) and return top K
  return scoredChunks
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK)
    .filter(chunk => chunk.similarity > 0.3); // Minimum similarity threshold
}

/**
 * Populate database with website content
 * Generates embeddings and stores all chunks
 */
async function populateDatabase() {
  console.log('🔄 Populating vector store with website content...');
  
  if (!db) {
    initializeDatabase();
  }

  const chunks = getAllChunks();
  console.log(`📝 Found ${chunks.length} content chunks`);

  let processed = 0;
  for (const chunk of chunks) {
    try {
      // Check if chunk already exists
      const existing = getChunk(chunk.id);
      if (existing && existing.embedding && existing.embedding.length > 0) {
        console.log(`⏭️  Skipping ${chunk.id} (already embedded)`);
        processed++;
        continue;
      }

      // Generate embedding
      console.log(`🔄 Embedding chunk ${chunk.id}...`);
      const embedding = await generateEmbedding(chunk.text);

      // Store in database
      storeChunk(
        chunk.id,
        chunk.text,
        chunk.type,
        chunk.metadata || {},
        embedding
      );

      processed++;
      console.log(`✅ Processed ${processed}/${chunks.length} chunks`);
    } catch (error) {
      console.error(`❌ Error processing chunk ${chunk.id}:`, error);
    }
  }

  console.log('✅ Vector store populated successfully');
}

/**
 * Check if database is populated
 * @returns {boolean} True if database has chunks
 */
function isPopulated() {
  if (!db) {
    initializeDatabase();
  }

  const stmt = db.prepare('SELECT COUNT(*) as count FROM chunks');
  const result = stmt.get();
  return result.count > 0;
}

/**
 * Clear all chunks (for re-population)
 */
function clearDatabase() {
  if (!db) {
    initializeDatabase();
  }

  db.exec('DELETE FROM chunks');
  console.log('🗑️  Database cleared');
}

module.exports = {
  initializeDatabase,
  storeChunk,
  getChunk,
  getAllStoredChunks,
  searchSimilar,
  populateDatabase,
  isPopulated,
  clearDatabase
};

