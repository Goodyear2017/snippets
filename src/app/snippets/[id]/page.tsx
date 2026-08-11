import { db } from '@/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import * as actions from "@/actions";
interface SnippetShowPageProps {
    params: Promise<{
        id: string
    }>;
   
}

export default async function SnippetShowPage(props:  SnippetShowPageProps ) {
    await new Promise((r) => setTimeout(r,2000));
    const { id } = await props.params;
    const snippetId = parseInt(id);

    const snippet = await db.snippet.findFirst({
        where:{ id: snippetId}
        
    });
    if(!snippet) {
        return notFound();
    }
    const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);
    return ( 
        <div>
        <div className="flex m-4 justify-between items-center">
            <h1 className="text-xl font-bold">{snippet.title}</h1>
            <div>
                <Link href={`/snippets/${snippet.id}/edit`} className = "p-2 border rounded">Edit</Link>
                <form action = {deleteSnippetAction}>
                    <button className = "p-2 border rounded">Delete</button>
                </form>
                
                
                
            </div></div>
            
            <pre className = "p-3 border rounded bg-gray-400">
                <code>{snippet.code}</code>
            </pre></div>
            
        )
}
export async function generateStaticParams() {
    const snippets = await db.snippet.findMany();
    return  snippets.map((snippet) => {
        return {
            id:snippet.id.toString(),

        };
    });


}