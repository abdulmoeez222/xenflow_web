/**
 * Embeddings Module
 * Handles text embedding generation using Transformers.js
 * 
 * Uses @xenova/transformers for free, local embeddings
 * Model: Xenova/all-MiniLM-L6-v2 (384 dimensions, fast)
 */

const { pipeline } = require('@xenova/transformers');
const path = require('path');

// Cache for the embedding pipeline
let embeddingPipeline = null;

/**
 * Initialize the embedding pipeline
 * Downloads model on first run (cached after)
 */
async function initializeEmbeddings() {
  if (embeddingPipeline) {
    return embeddingPipeline;
  }

  try {
    console.log('🔄 Initializing embeddings pipeline...');
    console.log('📥 This will download the model on first run (~90MB)...');
    
    embeddingPipeline = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2',
      {
        quantized: true, // Use quantized model for faster loading
        cache_dir: path.join(__dirname, '../.cache/models')
      }
    );

    console.log('✅ Embeddings pipeline initialized');
    return embeddingPipeline;
  } catch (error) {
    console.error('❌ Error initializing embeddings:', error);
    throw error;
  }
}

/**
 * Generate embedding for a single text
 * @param {string} text - Text to embed
 * @returns {Promise<Array>} Embedding vector (384 dimensions)
 */
async function generateEmbedding(text) {
  if (!embeddingPipeline) {
    await initializeEmbeddings();
  }

  try {
    const result = await embeddingPipeline(text, {
      pooling: 'mean',
      normalize: true
    });

    // Extract the embedding vector
    // Transformers.js returns a tensor, convert to array
    // Handle both tensor and array formats
    let embedding;
    if (result.data) {
      embedding = Array.from(result.data);
    } else if (Array.isArray(result)) {
      embedding = result;
    } else {
      // Try to extract from tensor
      embedding = Array.from(result);
    }
    
    return embedding;
  } catch (error) {
    console.error('❌ Error generating embedding:', error);
    throw error;
  }
}

/**
 * Generate embeddings for multiple texts (batch processing)
 * @param {Array<string>} texts - Array of texts to embed
 * @returns {Promise<Array<Array>>} Array of embedding vectors
 */
async function generateEmbeddings(texts) {
  if (!embeddingPipeline) {
    await initializeEmbeddings();
  }

  try {
    const embeddings = [];
    for (const text of texts) {
      const embedding = await generateEmbedding(text);
      embeddings.push(embedding);
    }
    return embeddings;
  } catch (error) {
    console.error('❌ Error generating batch embeddings:', error);
    throw error;
  }
}

/**
 * Calculate cosine similarity between two embeddings
 * @param {Array<number>} vec1 - First embedding vector
 * @param {Array<number>} vec2 - Second embedding vector
 * @returns {number} Cosine similarity score (0-1)
 */
function cosineSimilarity(vec1, vec2) {
  if (vec1.length !== vec2.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let norm1 = 0;
  let norm2 = 0;

  for (let i = 0; i < vec1.length; i++) {
    dotProduct += vec1[i] * vec2[i];
    norm1 += vec1[i] * vec1[i];
    norm2 += vec2[i] * vec2[i];
  }

  norm1 = Math.sqrt(norm1);
  norm2 = Math.sqrt(norm2);

  if (norm1 === 0 || norm2 === 0) {
    return 0;
  }

  return dotProduct / (norm1 * norm2);
}

module.exports = {
  initializeEmbeddings,
  generateEmbedding,
  generateEmbeddings,
  cosineSimilarity
};

