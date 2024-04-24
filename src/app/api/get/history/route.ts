const URL = "https://jsonplaceholder.typicode.com/todos";
//Not working. Currently only for testing
export async function GET() {
  const res = await fetch(URL);

  const todos = await res.json();

  return Response.json(todos);
}
