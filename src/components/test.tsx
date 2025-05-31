import { Fragment, useEffect, useState, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

interface Item {
  id: number;
  name: string;
  surname: string;
  middleName: string;
  phone: string;
  email: string;
  DOB: string;
}

const PAGE_SIZE = 20; // Number of items per page

function TableTest() {
  const [items, setItems] = useState<Item[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  // Fetch data with pagination
  const fetchData = useCallback(async (page: number = 1) => {
    setIsFetching(true);
    try {
      const response = await fetch(
        `http://localhost:3000/posts?_page=${page}&_limit=${PAGE_SIZE}`
      );
      const data: Item[] = await response.json();

      setItems((prev) => [...prev, ...data]);
      setHasMore(data.length === PAGE_SIZE);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  // Initial data load
  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  // Delete item function
  const deletePost = async (id: number) => {
    await fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    });
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Check if item is loaded
  const isItemLoaded = (index: number) => index < items.length;

  // Load more items when needed
  const loadMoreItems = () => {
    if (isFetching || !hasMore) return;
    const nextPage = Math.floor(items.length / PAGE_SIZE) + 1;
    fetchData(nextPage);
  };

  // Row component for virtualized list
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    if (!isItemLoaded(index)) {
      return (
        <tr style={style}>
          <td colSpan={8} className="text-center py-3">
            Loading...
          </td>
        </tr>
      );
    }

    const item = items[index];
    return (
      <tr key={`${item.id}-row`} style={style}>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>{item.surname}</td>
        <td>{item.middleName}</td>
        <td>{item.phone}</td>
        <td>{item.email}</td>
        <td>{item.DOB}</td>
        <td>
          <button
            type="button"
            onClick={() => deletePost(item.id)}
            className="btn btn-danger"
          >
            Удалить
          </button>
        </td>
      </tr>
    );
  };

  return (
    <Fragment>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Surname</th>
              <th scope="col">Middle Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Email</th>
              <th scope="col">DOB</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={hasMore ? items.length + 1 : items.length}
              loadMoreItems={loadMoreItems}
              threshold={5}
            >
              {({ onItemsRendered, ref }) => (
                <List
                  height={600}
                  itemCount={hasMore ? items.length + 1 : items.length}
                  itemSize={50}
                  width="100%"
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  style={{ display: "block" }}
                >
                  {({ index, style }) => (
                    <Row key={index} index={index} style={style} />
                  )}
                </List>
              )}
            </InfiniteLoader>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default TableTest;
