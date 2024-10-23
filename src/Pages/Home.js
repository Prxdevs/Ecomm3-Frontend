// Home.js

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Fade,
  Stack,
  Button,
  SimpleGrid,
  Card,
  CardHeader,
  Flex,
  CardBody,
  CardFooter,
  Image,
  Divider,
  ButtonGroup,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import sdsd from "./sdsd.png";
import dddd from "./dddd.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import "@fontsource/pt-sans";
import { getAllCategories, getAllProducts } from "../actions/api";

const Home = ({ }) => {
  const sliderSettings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  const imagePaths = [
    sdsd,
    sdsd,
    sdsd,
    // Add more image paths as needed
  ];
  const posterPaths = [
    dddd,
    dddd,
    dddd,
    // Add more image paths as needed
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  //  mouse hover on card
  const [hoveredProductId, setHoveredProductId] = useState(null);

  const handleHover = (productId) => {
    setHoveredProductId(productId);
  };

  const handleHoverOut = () => {
    setHoveredProductId(null);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:4000/product", {
  //         withCredentials: true,
  //       });

  //       if (response.status !== 200) {
  //         throw new Error(`Network response was not ok: ${response.status}`);
  //       }
  //       console.log(response.data);
  //       const productsData = response.data;
  //       setProducts(productsData);
  //       console.log("haha", productsData);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  //   return () => {
  //   };
  // }, []);

  const [selectedTag, setSelectedTag] = useState(null);

  const filteredProducts = selectedTag
    ? products.filter((product) => product.tag === selectedTag)
    : products;

  useEffect(() => {
    const categoriesSet = new Set(products.map((product) => product.category));
    const uniqueCategoriesArray = [...categoriesSet];
    setUniqueCategories(uniqueCategoriesArray);
  }, [products]);


  //////////////////

  const [tags, setTags] = useState(['Trending']);
  const [category, setCategory] = useState(null);
  const [color, setColor] = useState(null);

  const fecthData = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response);
      console.log(response);
      // setLoading(false);
    }
    catch (error) {
      setError(
        "An error occurred while fetching data. Please try again later."
      );
      setLoading(false);
    };
  };

  const fetchTags = async () => {
    try {
      const response = await getAllProducts(null, null, tags);
      console.log(response, 'product tag wise');

      setProducts(response);
    }
    catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fecthData();
    fetchTags();
  }, [tags]);

  return (
    <>
      <Box overflowX="hidden" overflowY="hidden">
        {/* First Slider with Image Paths */}
        <Slider {...sliderSettings}>
          {imagePaths.map((path, index) => (
            <Fade
              key={index}
              in={true}
              style={{ transitionDelay: `${index * 0.5}s` }}
            >
              <Box>
                <img
                  src={path}
                  alt={`Image ${index + 1}`}
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            </Fade>
          ))}
        </Slider>

        {/* Second Slider with Poster Paths */}
        <Slider {...sliderSettings}>
          {posterPaths.map((path, index) => (
            <Fade
              key={index}
              in={true}
              style={{ transitionDelay: `${index * 0.5}s` }}
            >
              <Box mb={4}>
                <img
                  src={path}
                  alt={`Poster ${index + 1}`}
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            </Fade>
          ))}
        </Slider>
      </Box>

      <Stack
        direction="column"
        spacing={4}
        align="center"
        justify="center"
        display="flex"
        flexWrap="wrap"
      >
        <Stack direction="row" spacing={4} mb={4} width={{ base: "100%", md: "auto" }}>
          <Button
            colorScheme="black"
            variant="outline"
            rounded="full"
            onClick={() => setTags("New Drops")}
            width={{ base: "100%", md: "auto" }}
          >
            New Drops
          </Button>
          <Button
            colorScheme="black"
            variant="outline"
            rounded="full"
            onClick={() => setTags("Winter Flex")}
            width={{ base: "100%", md: "auto" }}
          >
            Winter Flex
          </Button>
          <Button
            colorScheme="black"
            variant="outline"
            rounded="full"
            onClick={() => setTags("Trending")}
            width={{ base: "100%", md: "auto" }}
          >
            Trending
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={4} align="center" justify="center" marginTop={2}>
        <SimpleGrid columns={[1, 2, 2, 4]} spacing={4} alignItems="stretch">
          {products.map((product) => (
            <Link
              to={{
                pathname: `/productdetails/${product._id}`,
                state: { product },
              }}
              key={product._id}
            >
              <Card
                shadow={"none"}
                maxW={["100%", "100%", "xs"]}
                height="366px"
                width="244px"
              >
                <CardBody p={0}>
                  <Stack sx={{ objectFit: "contain" }}>
                    <Image
                      height="366px"
                      width="244px"
                      objectFit="cover"
                      src={`http://localhost:5000/uploads${hoveredProductId === product._id ? product.images[1] : product.images[0]}`}
                      onMouseOver={() => handleHover(product._id)}
                      onMouseOut={handleHoverOut}
                      alt={product.name}
                    />
                  </Stack>
                  <Stack direction="column" align="center" justify="center">
                    <Text marginBottom={"5px"} size="xs">
                      {product.name}
                      <br />
                      <Text m={1} fontSize="xs">
                        ₹ {product.price}
                      </Text>
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </Stack>
      <br></br>
      <br></br>
      {/* //category */}
      <Stack direction="column" spacing={4} align="center" justify="center">
        <Stack direction="row" spacing={4} mb={4}>
          <Heading colorScheme="black" variant="outline" rounded="full">
            {" "}
            All Categories
          </Heading>
        </Stack>
      </Stack>
      <br></br>
      <br></br>

      <Stack spacing={4} align="center" justify="center">
        <Stack spacing={4} align="center" justify="center">
          {/* Display unique categories and images */}

          <SimpleGrid columns={[1, 2, 4]} spacing={4} alignItems="stretch">
            {categories.map((category) => (
              <React.Fragment key={category}>
                <Link to={`/products/${encodeURIComponent(category.name)}`}>
                  <Card
                    height="366px"
                    width="244px" shadow={"none"} maxW={["100%", "100%", "xs"]}>
                    <CardBody p={0}>
                      <Image
                        height="244px"
                        width="280px"
                        objectFit="cover"
                        src={`http://localhost:5000/uploads${category.image[0]}`}
                      />
                      <Stack
                        direction="column"
                        align="center"
                        justify="center"
                      >
                        <Heading size="sm">{category.name}</Heading>
                      </Stack>
                    </CardBody>
                  </Card>
                </Link>
              </React.Fragment>
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </>
  );
};

export default Home;
