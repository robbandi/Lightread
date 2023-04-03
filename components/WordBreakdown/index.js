import { useState } from 'react';
import { Button, Form, FormControl, ListGroup } from 'react-bootstrap';

// ...

const WordBreakdown = () => {
  const [extract, setExtract] = useState('');
  const [breakdown, setBreakdown] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      // Split extract into an array of words
      const words = extract.split(' ');
      // Perform dictionary lookup for each word and store the results in an array
      const definitions = await Promise.all(words.map(getDefinition));
      // Set the breakdown state with the word-definition pairs
      setBreakdown(definitions);
    } catch (err) {
      setError(err.message);
    }
  };

  const getDefinition = async (word) => {
    try {
      const response = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${selectedWord}?key=${'b65f6803-0a14-4ae5-85d3-30a63ec37e61'}`
      const data = await response.json();
      console.log(data[0].shortdef[0])
      return { word, definition: data[0].shortdef[0] };
    } catch (err) {
      throw new Error(`Unable to get definition for word '${word}'`);
    }
  };

  return (
    <>
      <Form inline onSubmit={handleSubmit}/>
      <FormControl type="text" placeholder="Enter an extract" className="mr-sm-2" value={extract} onChange={(event) => setExtract(event.target.value)} />
<Button type="submit">Get Word Breakdown</Button>

{error && <p>{error}</p>}

<ListGroup>
  {breakdown.map((entry) => (
    <ListGroup.Item key={entry.word}>
      <strong>{entry.word}:</strong> {entry.definition}
    </ListGroup.Item>
  ))}
</ListGroup>
</>
  )
}

export default WordBreakdown;