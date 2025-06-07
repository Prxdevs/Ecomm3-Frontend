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
  Stat,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import sdsd from "./sdsd.png";
import cat1 from "../images/cat1.jpg"
import cat2 from "../images/cat2.jpg"
import dddd from "../images/slider1.png";
import slider1 from "../images/1.png";
import slider2 from "../images/2.png";
import slider3 from "../images/3.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
// import "@fontsource/pt-sans";
import { addToWishlistt, getAllCategories, getAllProducts } from "../actions/api";
import StaticSlider from "../components/StaticSlider";

const Home = ({ }) => {
  const sliderSettings = {
    // dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  const categoryBg = '#efffa0';
  const images = [
    cat1,
    cat2,
    cat1,
    cat2,
    cat1,
    cat2,
    cat1,
    cat2,
    cat1,
    cat2,
    cat1,
    cat2,
    cat1,
    cat2,
    cat1,
    cat2,
    // Add more image paths as needed
  ];
  const posterPaths = [
    slider1,
    slider2,
    slider3,
    // Add more image paths as needed
  ];
  const leftSliderSettings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 5, // Show fewer slides on tablets
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // For mobile devices
        settings: {
          slidesToShow: 3, // Show even fewer slides on mobile
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For smaller mobile devices
        settings: {
          slidesToShow: 2, // Show only two slides on smaller screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  const rightSliderSettings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: false,
    rtl: true, // Right to left scrolling
    responsive: [
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // For mobile devices
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For smaller mobile devices
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
      // console.log(response);
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
      // console.log(response, 'product tag wise');
      setProducts(response.products);
    }
    catch (error) {
      setError(error);
      setLoading(false);
    }
  }
  const [allProducts, setAllProducts] = useState([]);
  const fetchAllProducts = async () => {
    try {
      const response = await getAllProducts(null, null, null, 1, 10);
      setAllProducts(response.products);
      console.log(response, 'product all');
    }
    catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  const toast = useToast();
  const addToWishlist = async (productId) => {
    const response = await addToWishlistt(productId);
    // console.log(response);
    // setIsAddedToWishlist(true);
    toast({
      title: response.data.message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    fetchAllProducts();
    fecthData();
    fetchTags();
  }, [tags]);

  return (
    <>
      <Box overflowX="hidden" overflowY="hidden">
        {/* First Slider with Image Paths */}
        {/* <Slider {...sliderSettings}>
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
        </Slider> */}

        {/* Second Slider with Poster Paths */}
        <Slider {...sliderSettings}>
          {posterPaths.map((path, index) => (
            <Fade
              key={index}
              in={true}
              style={{ transitionDelay: `${index * 0.5}s` }}
            >
              <Box mb={4}>
                <Image
                  src={path}
                  alt={`Poster ${index + 1}`}
                  style={{ width: "100%", height: "auto" }}
                />
              </Box>
            </Fade>
          ))}
        </Slider>
      </Box>

      {/* <Box
        px="50px" // 50px padding on the left and right
        py="20px" // Optional: Padding on top and bottom
        // bg="gray.100" // Optional: Background color for better visual separation
      >
        <StaticSlider products={allProducts} />
      </Box> */}

      {/* Featured Product Slider */}

      <Box m={0}>
        <Stack direction="column" spacing={4} align="center" justify="center" mt={4} mb={2}>
          <Stack direction="row" spacing={4}>
            <Heading p={'5px 30px'} colorScheme="black" variant="outline" rounded="full" fontSize={'4xl'} fontFamily="'Quicksand', sans-serif">
              {/* {" "} */}
              Featured Products
            </Heading>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          spacing={4}
          align="center"
          justify="center"
          display="flex"
          flexWrap="wrap"
        >
          <Stack direction="row" spacing={2} mb={4} width={{ base: "100%", md: "auto" }}>
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
              <Card
                shadow={"none"}
                maxW={["100%", "100%", "xs"]}
                // height="366px"
                width="244px"
              >
                <CardBody p={0} borderRadius={'25px'} boxShadow={"0px 0px 10px rgba(0, 0, 0, 0.1)"}>
                  <Link
                    to={{
                      pathname: `/productdetails/${product._id}`,
                      state: { product },
                    }}
                    key={product._id}
                  >
                    <Stack sx={{ objectFit: "contain" }}>
                      <Image
                        height="200px"
                        width="244px"
                        objectFit="cover"
                        borderRadius={'25px'}
                        p={4}
                        // boxShadow={"0px 0px 10px rgba(0, 0, 0, 0.1)"}
                        src={`http://localhost:5000/uploads${hoveredProductId === product._id ? product.images[1] : product.images[0]}`}
                        onMouseOver={() => handleHover(product._id)}
                        onMouseOut={handleHoverOut}
                        alt={product.name}
                      />
                    </Stack>
                  </Link>
                  <Stack direction="column" display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Text size="xs">
                      {product.name}
                      <Text textAlign={'center'} fontWeight={600} fontSize="xl" fontFamily="'Quicksand', sans-serif">
                        ₹ {product.variants[0].price}
                      </Text>
                    </Text>
                    <Text textAlign={'center'} fontSize="xs" fontFamily="'Quicksand', sans-serif">
                      MRP (Inc. of all taxes)
                    </Text>
                    <Flex mb={2} w={'90%'} justifyContent={'center'}>
                      <Button w={'100%'} borderRadius={'50px'} onClick={() => addToWishlist(product._id)}>
                        Add To Wishlist
                      </Button>
                    </Flex>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Box >

      {/* <br></br>
      <br></br> */}
      {/* //category */}
      <Box bgColor={categoryBg} mt={20} pb={10} pt={1}>
        <Stack direction="column" spacing={4} align="center" justify="center" mt={8} mb={4}>
          <Stack direction="row" spacing={4} mb={4}>
            <Heading p={'5px 30px'} colorScheme="black" variant="outline" rounded="full" fontSize={'4xl'} fontFamily="'Quicksand', sans-serif">
              {/* {" "} */}
              All Categories
            </Heading>
          </Stack>
        </Stack>

        <Stack spacing={4} align="center" justify="center">
          <Stack spacing={4} align="center" justify="center">
            {/* Display unique categories and images */}

            <SimpleGrid columns={[1, 2, 2]} spacing={4} alignItems="stretch" margin={'0 50px'} height={'100%'}>
              {categories.map((category) => (
                <React.Fragment key={category}>
                  <Link to={`/products/${encodeURIComponent(category.name)}`} display='flex' justifyContent={'center'} alignItems={'center'}>
                    <Card
                      height="100%"
                      width="100%" shadow={"none"}
                    >
                      <CardBody p={0} display={'flex'} justifyContent={'center'} height={'100%'} bgColor={categoryBg}>
                        <Box maxW={["100%", "100%", "100%"]} >
                          <Image
                            // height="100%"
                            borderRadius={'25px'}
                            width="100%"
                            objectFit="contain"
                            src={`http://localhost:5000/uploads${category.image[0]}`}
                          />
                          {/* <Stack
                            direction="column"
                            align="center"
                            justify="center"
                          >
                            <Heading size="sm">{category.name}</Heading>
                          </Stack> */}
                        </Box>
                      </CardBody>
                    </Card>
                  </Link>
                </React.Fragment>
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Box>

      {/* All Products */}
      <Box mt={10} pb={10} pt={1}>
        <Stack direction="column" spacing={4} align="center" justify="center" mt={8} mb={4}>
          <Stack direction="row" spacing={4} mb={4}>
            <Heading p={'5px 30px'} colorScheme="black" variant="outline" rounded="full" fontSize={'4xl'} fontFamily="'Quicksand', sans-serif">
              {/* {" "} */}
              All Products
            </Heading>
          </Stack>
        </Stack>

        <Stack spacing={4} align="center" justify="center" marginTop={2}>
          <SimpleGrid columns={[1, 2, 2, 4]} spacing={4} alignItems="stretch">
            {allProducts.map((product) => (
              <Card
                shadow={"none"}
                maxW={["100%", "100%", "xs"]}
                // height="366px"
                width="244px"
              >
                <CardBody p={0} borderRadius={'25px'} boxShadow={"0px 0px 10px rgba(0, 0, 0, 0.1)"}>
                  <Link
                    to={{
                      pathname: `/productdetails/${product._id}`,
                      state: { product },
                    }}
                    key={product._id}
                  >
                    <Stack sx={{ objectFit: "contain" }}>
                      <Image
                        height="200px"
                        width="244px"
                        p={4}
                        objectFit="cover"
                        borderRadius={'25px'}
                        // boxShadow={"0px 0px 10px rgba(0, 0, 0, 0.1)"}
                        src={`http://localhost:5000/uploads${hoveredProductId === product._id ? product.images[1] : product.images[0]}`}
                        onMouseOver={() => handleHover(product._id)}
                        onMouseOut={handleHoverOut}
                        alt={product.name}
                      />
                    </Stack>
                  </Link>
                  <Stack direction="column" display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Text size="xs">
                      {product.name}
                      <Text textAlign={'center'} fontWeight={600} fontSize="xl" fontFamily="'Quicksand', sans-serif">
                        ₹ {product.variants[0].price}
                      </Text>
                    </Text>
                    <Text textAlign={'center'} fontSize="xs" fontFamily="'Quicksand', sans-serif">
                      MRP (Inc. of all taxes)
                    </Text>
                    <Flex mb={2} w={'90%'} justifyContent={'center'}>
                      <Button w={'100%'} borderRadius={'50px'} onClick={() => addToWishlist(product._id)}>
                        Add To Wishlist
                      </Button>
                    </Flex>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Box >

      {/* Spotlight Section */}
      < Box mt={5} display={'flex'} textAlign={'center'} justifyContent={'center'} bgColor={'gray.50'} >
        <Flex direction={'column'} pt={10}>
          <Text fontSize={'lg'}>
            World on your plate
          </Text>
          <Text fontSize={'5xl'} fontWeight={'800'} fontFamily="'Quicksand', sans-serif">
            SPOTLIGHT
          </Text>
        </Flex>
      </Box >

      <Box bgColor={'gray.50'} pt={10} pb={5}>
        <div className="spotlight-section">
          <div className="slider-container">
            <Slider {...leftSliderSettings}>
              {images.map((image, index) => (
                <div key={index} className="slide">
                  <img style={{ height: '200px', width: '200px', borderRadius: '25px' }} src={image} alt={`Slide ${index}`} className="slide-image" />
                </div>
              ))}
            </Slider>
          </div>

          <div className="slider-container" style={{ marginTop: '10px' }}>
            <Slider {...rightSliderSettings}>
              {images.map((image, index) => (
                <div key={index} className="slide">
                  <img style={{ height: '200px', width: '200px', borderRadius: '25px' }} src={image} alt={`Slide ${index}`} className="slide-image" />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Home;
