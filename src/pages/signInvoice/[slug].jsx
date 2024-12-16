import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import Logo from "@/images/logo.png";
import { Button, TextField, Typography, Box } from '@mui/material';

function SignInvoice() {
  const DEFINE_CODE = "ZD2384H";
  const router = useRouter();
  const canvasRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const [code, setCode] = useState("");
  const idInvoice = router?.query?.slug || null;

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const handleMouseMove = (e) => {
    if (e.buttons !== 1) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const saveSignature = async () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const fileName = `signature_${idInvoice}.png`;

    try {
      const response = await fetch('/api/saveSignature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageData: image, fileName }),
      });
      if (response.ok) {
        alert("Signature sauvegardée avec succès !");
        setImageData(image);
      } else {
        alert("Erreur lors de la sauvegarde de la signature.");
      }
    } catch (error) {
      alert("Erreur réseau lors de la sauvegarde de la signature.");
    }
  };

  const resetSign = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setImageData(null);
  };

  if (code !== DEFINE_CODE) {
    return (
      <Box className='sign_code' textAlign='center' p={4}>
        <Typography variant="h4" mb={4}>Entrez le code caché dans l'email</Typography>
        <TextField
          label="Code secret"
          type='password'
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          variant="outlined"
          fullWidth
        />
      </Box>
    );
  }

  return idInvoice ? (
    <Box>
      <Box className='navbar_sign' textAlign='center' >
        <Box className='navbar_sign_title' mb={4}>
          <Image src={Logo} alt='Logo sign invoice' />
          <Typography variant="h5">Signature de la facture #{idInvoice}</Typography>
        </Box>
        <Box className='navbar_sign_container' mb={4}>
          <canvas
            ref={canvasRef}
            width={600}
            height={300}
            style={{ border: '2px solid black', background: 'white' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
          ></canvas>
          <Box mt={2} display='flex' gap={2} justifyContent='center'>
            <Button variant="outlined" onClick={saveSignature} color="primary">Sauvegarder la signature</Button>
            <Button variant="outlined" onClick={resetSign} color="secondary">Réinitialiser la signature</Button>
          </Box>
        </Box>
        {imageData && (
          <Box mt={4} textAlign='center'>
            <Typography variant="h6">Signature sauvegardée :</Typography>
            <img src={imageData} alt="Signature" style={{ maxWidth: "100%" }} />
          </Box>
        )}
      </Box>
    </Box>
  ) : (
    <Typography variant="h4" textAlign='center' p={4}>ID de la facture n'existe pas ou n'est pas valide</Typography>
  );
}

export default SignInvoice;
