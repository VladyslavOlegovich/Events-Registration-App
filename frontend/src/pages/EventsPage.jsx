import styles from "./EventsPage.module.css";
import { useEffect, useState } from "react";
import { EventList } from "../components/EventList";
import { fetchEvents } from "../services/eventService";
import { SortOptions } from "../components/SortOptions";
import { Pagination } from "../components/Pagination";
import { SearchBar } from "../components/SearchBar";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("eventDate");
  const [order, setOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAndSetEvents = async (page, sortBy, order, searchQuery) => {
    setLoading(true);
    setError("");
    try {
      const fetchedData = await fetchEvents(page, sortBy, order, searchQuery);

      if (fetchedData.error) {
        throw new Error(fetchedData.error);
      }

      setEvents(fetchedData.events);
      setTotalPages(fetchedData.totalPages);
      setLoading(false);
    } catch (err) {
      console.log("error:", err);
      setError("Unable to fetch events.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetEvents(currentPage, sortBy, order, searchQuery);
  }, [currentPage, sortBy, order, searchQuery]);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handleOrderChange = (newOrder) => {
    setOrder(newOrder);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className={styles.eventsPage}>
      <h1>Events Registration App</h1>
      <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
      <SortOptions
        sortBy={sortBy}
        order={order}
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
      />
      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p>{error}</p>
      ) : events?.length == 0 ? (
        <p>No events found.</p>
      ) : (
        <>
          <EventList events={events} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
