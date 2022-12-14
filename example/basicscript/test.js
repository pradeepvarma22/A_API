import fetch from 'cross-fetch';

const API_KEY_PROD = "https://airclone-gules.vercel.app/api/graphql/validate/22e52c93af102f30x07xa9de0fd62425";
const API_KEY_QA = "http://localhost:3000//api/graphql/validate/rnsstsatrHatth.aniaattiit";

const myQuery = `
{
    userAccounts(first: 4) {
        id
        address
    }  
}
`

async function main() {
    const res = await fetch(API_KEY_QA, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            graphName: "USDT",
            myQuery: myQuery
        })
    })

    const data = await res.json()
    console.log(data)
}

async function _main() {
    await main()
}

_main()