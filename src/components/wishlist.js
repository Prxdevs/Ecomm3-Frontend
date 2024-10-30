import React, { useEffect, useState } from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack, Heading, Box, Link, useColorModeValue as mode, Flex,
  Input, Image,
  Select,
  Button,
  Text,
  Divider,
  List,
  ListItem,
  ListIcon,
  HStack,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import axios from 'axios';
import { MdCheckCircle, MdLocationCity } from 'react-icons/md';
import { getWishlist, removeFromWishlist } from '../actions/api';
import { DeleteIcon } from '@chakra-ui/icons';

const WishlistDrawer = ({
  isWishlistOpen,
  setWishlistOpen,

}) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [activeTab, setActiveTab] = useState(0); // 0 for phone number, 1 for address
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleRemoveFromCart = async (itemId ) => {
    console.log('itemif', itemId);
    try {
      const response = await removeFromWishlist(itemId);
      console.log('Response from removeFromCart:', response);
      getCartData();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const getCartData = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      const response = await getWishlist();
      setWishlistItems(response.wishlistItems);
      console.log(response.wishlistItems, 'getWishiiee');
      console.log(wishlistItems)
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };
  useEffect(() => {
    if (isWishlistOpen) {
      getCartData();
    }
  }, [isWishlistOpen]);


  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleCheckout = () => {
    // Add logic for handling the checkout process
    // You can show the order confirmation modal here
    setOrderModalOpen(true);
  };
  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  const handlePincodeChange = (e) => {
    setPincode(e.target.value);
  };

  const handleDone = () => {
    if (phoneNumber && name && email && address && city && pincode) {
      const data = {
        "name": name,
        "email": email,
        "phone": phoneNumber,
        "address": address,
        "city": city,
        "pincode": pincode,
      }

      const token = localStorage.getItem('token');

      // Set the Authorization header with the token
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      axios.post('http://localhost:4000/orders/checkout', data, { headers }).then(res => console.log(res)).catch(error => {
        console.error(error);
      });
    }

    // axios.post('localhost:4000/orders/checkout')



    // Close the modal after confirming the order
    setOrderModalOpen(false);
    setCurrentStep(0)
  };

  return (
    <Drawer
      placement="right"
      onClose={() => setWishlistOpen(false)}
      isOpen={isWishlistOpen}
      size="auto"
    >
      <DrawerOverlay>
        <DrawerContent style={{ maxWidth: "100%", width: "40%" }}>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading fontSize="2xl" fontWeight="extrabold">
              Wishlist ({wishlistItems.length} Items)
            </Heading>
          </DrawerHeader>
          <Divider my={4} />
          <DrawerBody>
            <Box
              maxW={{ base: "3xl", lg: "7xl" }}
              mx="auto"
              px={{ base: "4", md: "8", lg: "12" }}
              py={{ base: "6", md: "8", lg: "12" }}
            >
              <Stack
                direction={{ base: "column", lg: "row" }}
                align={{ lg: "flex-start" }}
                spacing={{ base: "8", md: "16" }}
              >
                <Stack
                  spacing={{ base: "8", md: "10" }}
                  flex="2"
                  position="relative"
                >
                  <Stack spacing="6">
                    {wishlistItems && wishlistItems.length > 0 ? (
                      wishlistItems.map((item, index) => (
                        <HStack
                          display="flex"
                          key={index}
                          spacing={4}
                          borderBottom="1px solid"
                          borderColor="gray.200"
                        >
                          <Image
                            src={`http://localhost:5000/uploads${item.product.images[0]}`}
                            alt={item.product.name}
                            boxSize="80px"
                            objectFit="cover"
                          />
                          <Stack flex="1">
                            <Text fontSize="md" fontWeight="bold">
                              {item.product.name}
                            </Text>
                            {/* <Text fontSize="xs">
                              Color: {item.color}
                            </Text>
                            <Text fontSize="xs">Quantity: {item.quantity}</Text> */}
                          </Stack>
                          <Stack display={"flex"} alignItems="end" gap={2}>
                            <DeleteIcon onClick={() => handleRemoveFromCart(item.product._id)} cursor="pointer" />
                          </Stack>
                        </HStack>
                      ))
                    ) : (
                      <Text textAlign="center" color="gray.500">
                        No items in the Wishlist
                      </Text>
                    )}
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default WishlistDrawer;
