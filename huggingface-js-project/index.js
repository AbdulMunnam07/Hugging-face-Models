import { pipeline } from '@huggingface/transformers';
import fetch from 'node-fetch';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for global fetch and TextEncoder/TextDecoder
global.fetch = fetch;
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

async function loadModel() {
    const generator = await pipeline('text-generation', 'gpt2');
    return generator;
}

async function generateText() {
    const generator = await loadModel();
    const output = await generator('Hello, how are you?', {
        max_length: 50,
        num_return_sequences: 1,
    });
    console.log(output);
}

generateText();