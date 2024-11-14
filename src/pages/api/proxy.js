// pages/api/proxy.js
export default async function handler(req, res) {
    const { siren } = req.query;

    try {
        const response = await fetch(`https://data.siren-api.fr/v3/unites_legales/${siren}`, {
            method: 'GET',
            headers: {
                'X-Client-Secret': 'C8lTsNaweVleUm0y7chcLFYP2YxC2MyG',
            },
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Failed to fetch data' });
        }

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Server error', message: error.message });
    }
}
