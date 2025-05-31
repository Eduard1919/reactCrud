import Table from "./components/table";
import TableForm from "./components/form";
function App() {
  return (
    <div className="container mt-4">
      <TableForm />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Middle</th>
            <th scope="col">Phone</th>
            <th scope="col">Email</th>
            <th scope="col">DOB</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <Table />
      </table>
    </div>
  );
}
export default App;
