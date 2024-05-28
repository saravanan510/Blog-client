import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import BlogCard from "./BlogCard";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Axios from "../utils/axios.js";
import SentimentDissatisfiedOutlinedIcon from "@mui/icons-material/SentimentDissatisfiedOutlined";
import CircularProgress from "@mui/material/CircularProgress";

const Home = () => {
  const { user } = useAuth();
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const postsResponse = await Axios.get("/api/posts/", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setBlogPosts(postsResponse.data);

        const tagsResponse = await Axios.get("/api/tags/");
        setTags(tagsResponse.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredPosts = blogPosts.filter((blog) => {
    if (currentTabIndex === 0) return true;
    if (currentTabIndex === 1) return blog.author._id === user?.profile._id;
    return blog.tags.some(
      (tag) => tag.name === tags[currentTabIndex - 2]?.name
    );
  });

  return (
    <div>
      <Container component="main" maxWidth="md" sx={{ padding: "32px 0" }}>
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <Tabs
          value={currentTabIndex}
          onChange={handleTabChange}
          sx={{ marginBottom: "24px" }}
        >
          <Tab label="All Posts" />
          <Tab label="My Posts" />
          {tags.map((tag, index) => (
            <Tab key={index} label={tag.name} />
          ))}
        </Tabs>

        {filteredPosts.length === 0 ? (
          <Box
            sx={{
              height: "260px",
              textAlign: "center",
              alignContent: "center",
            }}
          >
            <Box>
              <SentimentDissatisfiedOutlinedIcon
                sx={{ fontSize: "100px", color: "grey" }}
              />
              <Typography variant="h6">Sorry! No records found</Typography>
            </Box>
          </Box>
        ) : (
          filteredPosts.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))
        )}
      </Container>
    </div>
  );
};

export default Home;
