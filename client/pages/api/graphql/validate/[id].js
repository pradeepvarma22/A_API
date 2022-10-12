import { User } from '../../../../models/userModel'
import connectdb from '../../../../utility/db/connectdb'

import axios from "axios";

/*
    ->apiKey [url]
    -> subgraph_name: 
    -> query
*/

export default async function validateMe(req, res) {

    await connectdb();
    const { id } = req.query
    const apiKey = id
    console.log(apiKey)
    const isUserActive = await User.find({ apiKey: apiKey });

    if (isUserActive.length == 0) {
        res.status(400).json({ "error": "invalid api key" })
    }

    // get List of subgraphs

    // subgraph_name:""

    // subgraph_id

    //  fetch our db which have query urls for subgraphs

    //  query:->subgraph_id "" using axios

    //https://api.thegraph.com/subgraphs/name/pradeepvarma22/usdt


    // get This Data from req.body.requestedQuery
    const requestedQuery = `{
        userAccounts(first:50){
            address
        }
    }`
    

    const result = await axios.post(
        "https://api.thegraph.com/subgraphs/name/pradeepvarma22/usdt",
        {
            query: `
            ${requestedQuery}
          `
        }
    );

    console.log(result.data.data.userAccounts);



    console.log(id)
    res.status(200).json((result.data.data.userAccounts))
}

/*
{
    userAccounts(first:50){
        address
    }
}
*/