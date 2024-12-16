import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { imageData, fileName } = req.body;

    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");

    const filePath = path.join(process.cwd(), 'public', 'signatures', fileName);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    fs.writeFile(filePath, base64Data, 'base64', (err) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la sauvegarde' });
      } else {
        res.status(200).json({ message: 'Signature sauvegardée avec succès' });
      }
    });
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
