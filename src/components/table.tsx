import { Fragment, useEffect, useState } from "react";

interface Item {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  phone: string;
  email: string;
  DOB: string;
}

function Table() {
  const [posts, setPosts] = useState<Item[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/posts`, {
        method: "GET",
      });
      const data: Item[] = await response.json();
      setPosts(data);
      console.log(data);
    };
    fetchData();
  }, [setPosts]);
  const deletePost = async (id: number) => {
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    });
    const updatedPosts = posts.filter((x) => x["id"] != id);
    setPosts(updatedPosts);
  };
  return (
    <tbody>
      {posts.map((item) => (
        <tr key={item["id"] + "row"}>
          <th key={item["id"]} scope="row">
            {item["id"]}
          </th>
          <td key={item["name"]}>{item["name"]} </td>
          <td key={item["surname"]}>{item["surname"]} </td>
          <td key={item["middleName"]}>{item["middleName"]} </td>
          <td key={item["phone"]}>{item["phone"]} </td>
          <td key={item["email"]}>{item["email"]} </td>
          <td key={item["DOB"]}>{item["DOB"]} </td>
          <td>
            <button
              type="button"
              onClick={() => {
                deletePost(item["id"]);
              }}
              className="btn btn-danger"
            >
              Удалить
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
export default Table;
