// components/NewsForm.jsx
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import RichTextEditor from './RichTextEditor'; // hoặc dùng react-quill
import dayjs from 'dayjs';

export default function NewsForm({ initialData = {}, onSave, onDelete }) {
  const [article, setArticle] = useState({
    title: '',
    summary: '',
    content: '',
    image: '',
    date: new Date(),
    ...initialData,
  });

  const handleChange = (field, value) => {
    setArticle((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave && onSave(article);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          value={article.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Summary</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          value={article.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Content</Form.Label>
        <RichTextEditor
          value={article.content}
          onChange={(value) => handleChange('content', value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          value={article.image}
          onChange={(e) => handleChange('image', e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Publish Date</Form.Label>
        <Form.Control
          type="date"
          value={dayjs(article.date).format('YYYY-MM-DD')}
          onChange={(e) =>
            handleChange('date', new Date(e.target.value))
          }
        />
      </Form.Group>

      <div className="d-flex justify-content-between">
        <Button type="submit" variant="primary">
          💾 Save
        </Button>
        {onDelete && (
          <Button variant="danger" onClick={onDelete}>
            🗑 Delete
          </Button>
        )}
      </div>
    </Form>
  );
}
