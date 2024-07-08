import path from 'path';
import fs from 'fs/promises';
import data from '../public/assets/jogos.json' assert { type: 'json'}

export default async function addJogo(jogo: Jogo) {
  try {
    // Path to the JSON file
    
    // Read the existing file
    
    // Parse the JSON content
    const jogos = useJogos()    
    // Add a unique ID to the new game
    jogo.id = jogos.length ? Math.max(...jogos.map(j => j.id)) + 1 : 1;
    jogo.createAt = new Date()
    
    // Add the new game to the array
    jogos.push(jogo);
    const json = JSON.stringify(jogos)
    
    // Write the updated array back to the file
    // await fs.writeFile("../public/assets/jogos.json", json)
    useFetch('/api/teste', {
        method: 'POST',
        body: jogos
    })
    return jogo.id;
  } catch (error) {
    console.error('Error adding new game:', error);
    throw new Error('Could not add new game');
  }
}
