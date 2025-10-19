import test from 'node:test';
import assert from 'node:assert/strict';

import { cleanMarkdownToPlainText } from '../src/utils/cleanMarkdown.js';

test('cleanMarkdownToPlainText returns empty string for falsy input', () => {
  assert.equal(cleanMarkdownToPlainText(undefined), '');
  assert.equal(cleanMarkdownToPlainText(null), '');
  assert.equal(cleanMarkdownToPlainText(''), '');
});

test('cleanMarkdownToPlainText strips markdown formatting and normalises whitespace', () => {
  const input = `# Heading\n\n> Quote line\n\nThis is *bold* and _italic_ text with a [link](https://example.com).\n\n![Alt text](image.png)\n\n\tCode span: \`const x = 1;\`;`;
  const result = cleanMarkdownToPlainText(input);
  assert.equal(
    result,
    'Heading Quote line This is bold and italic text with a link. Alt text Code span: const x = 1;;'
  );
});

test('cleanMarkdownToPlainText preserves alt text and link text', () => {
  const input = '![Sunrise over hills](image.jpg) [Read more](https://example.com)';
  const result = cleanMarkdownToPlainText(input);
  assert.equal(result, 'Sunrise over hills Read more');
});

test('cleanMarkdownToPlainText removes inline HTML tags but keeps text content', () => {
  const input = 'Paragraph with <strong>bold</strong> and <em>italic</em> text.';
  const result = cleanMarkdownToPlainText(input);
  assert.equal(result, 'Paragraph with bold and italic text.');
});
