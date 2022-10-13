import { useEffect, useRef, useState } from 'react';
import Editor, { Monaco } from "@monaco-editor/react";

const defaultQuery = `{
    userAccounts(first: 5) {
        id
        address
        transaction(where: {tokenType: ERC20}) {
            id
            tokenType
            transactionType
        }
    }
    transactions(first: 5, where: {tokenType: ERC20}){
        id
        from
        to
        value
        tokenType
        transactionType
    }
}
`

export default function Query() {

    const [graphName, setGraphName] = useState()
    const [apiKey, setApiKey] = useState("https://airclone-gules.vercel.app/api/graphql/validate/rnsstsatrHatth.aniaattiit")
    const [myQuery, setMyQuery] = useState(defaultQuery)
    const [queryData, setQueryData] = useState([])
    const editorRef = useRef(null);


    async function getQueryData() {

        apiKey
        graphName
        myQuery

        const res = await fetch(apiKey, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                graphName: graphName,
                myQuery: myQuery
            })
        }
        )

        const jsonData = await res.json()

        const finalStrData = JSON.stringify(jsonData,undefined,2)
        setQueryData(finalStrData)


    }

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function setme(e) {
        setMyQuery(e)
    }

    return (
        <div className='p-1'>
            <div className='py-5 text-2xl font-semibold underline'>
                <center>Query Your API </center>
            </div>

            <div className="grid grid-cols-2">
                <div>
                    <Editor
                        width="100vh"
                        height="80vh"
                        theme="vs-dark"
                        defaultLanguage="graphql"
                        defaultValue={defaultQuery}
                        onMount={handleEditorDidMount}
                        onChange={setme}
                    />
                </div>
                <div className='grid grid-rows-2 '>
                    <div className='border-2 border-rose-500'>
                        <div className='p-1'>
                            <button type="button" onClick={getQueryData} className="text-white bg-gray-800 hover:bg-gray-900  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Query</button>
                        </div>
                        <div className='overflow-auto h-56 text-justify'>
                            <pre>
                                {queryData}

                            </pre>

                        </div>
                    </div>
                    <div className='border-2 border-rose-500'>
                        <div className='p-2 text-xl underline'>API Details</div>
                        <div className="flex justify-center items-center py-16">
                            <div className="w-full max-w-sm grid grid-rows-2 gap-3">
                                <div className="flex items-center border-b border-teal-500 py-2">
                                    <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Please Enter AS API Here" onChange={(e) => setApiKey(e.target.value)} defaultValue={apiKey} />
                                </div>
                                <div>
                                    <div>
                                        <select id="dropdown" onChange={(event) => setGraphName(event.target.value)}>
                                            <option value="USDT">USDT</option>
                                        </select>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}