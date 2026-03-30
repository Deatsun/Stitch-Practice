export async function GET(){
    try{
        const res = await fetch("https://rickandmortyapi.com/api/location");
        const data = await res.json();

        return Response.json(data);
    } catch(error){
        return Response.json({error:"Failed to fetch location"},
            {status: 500}
        )
    }
}