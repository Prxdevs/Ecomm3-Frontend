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
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { MdCheckCircle, MdLocationCity } from 'react-icons/md';
import { getCart, getCartTotal, removeFromCart } from '../actions/api';
import { DeleteIcon } from '@chakra-ui/icons';

const ShoppingCartDrawer = ({
  isCartOpen,
  setCartOpen,

}) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [activeTab, setActiveTab] = useState(0); // 0 for phone number, 1 for address
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const toast = useToast();

  const handleRemoveFromCart = async (itemId, color) => {
    console.log('itemif', itemId, color);
    try {
      const response = await removeFromCart(itemId, color);
      console.log('Response from removeFromCart:', response);
      getCartData();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const getCartData = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      const response = await getCart();
      const response2 = await getCartTotal();
      setCartTotal(response2.total);
      setCartItems(response.cartItems);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      toast({
        title: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    if (isCartOpen) {
      getCartData();
    }
  }, [isCartOpen]);


  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  // Function to handle the checkout process
  const handleCheckout = () => {
    setOrderModalOpen(true);
  };
  const handleTabChange = (index) => {
    setActiveTab(index);
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
      onClose={() => setCartOpen(false)}
      isOpen={isCartOpen}
      size="auto"
    >
      <DrawerOverlay>
        <DrawerContent style={{ maxWidth: "100%", width: "40%" }}>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading fontSize="2xl" fontWeight="extrabold">
              Cart ({cartItems.length} items)
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
                    {cartItems && cartItems.length > 0 ? (
                      cartItems.map((item, index) => (
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
                            <Text fontSize="xs">
                              Color: {item.color}
                            </Text>
                            {/* <Text fontSize="xs">Size: {item.selectedSize}</Text> */}
                            <Text fontSize="xs">Quantity: {item.quantity}</Text>
                          </Stack>
                          <Stack display={"flex"} mt={18} alignItems="end" gap={2}>
                            <DeleteIcon onClick={() => handleRemoveFromCart(item.product._id, item.color)} cursor="pointer" />
                            <Text fontSize="xs" fontWeight="bold">
                              Price: ${item.currentPrice}
                            </Text>
                          </Stack>
                        </HStack>
                      ))
                    ) : (
                      <Text textAlign="center" color="gray.500">
                        No items in the cart
                      </Text>
                    )}
                  </Stack>
                </Stack>
              </Stack>

              <Flex direction="column" align="center" flex="1">
                {/* Additional components related to cart summary can be added here */}
              </Flex>
              <Stack
                position="sticky"
                bottom="0"
                bg="white"
                p={4}
                borderTop="1px solid"
                borderColor="gray.200"
              >
                <Text fontSize="lg" fontWeight="bold">
                  Subtotal: {/* Add your logic to calculate subtotal */}
                </Text>
                <Button
                  onClick={handleCheckout}
                  bg="black"
                  color="white"
                  _hover={{}}
                  size="md"
                  mt={2}
                >
                  Proceed to Checkout: ₹{cartTotal}
                </Button>
              </Stack>
              <Modal
                isOpen={isOrderModalOpen}
                onClose={() => setOrderModalOpen(false)}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Order Confirmation</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Tabs index={currentStep} onChange={handleTabChange}>
                      <TabList>
                        <Tab
                          _selected={{
                            borderBottom: "2px solid black", // Change the bottom border color for the active tab
                            color: "black", // Change the text color for the active tab
                          }}
                          onClick={() => setCurrentStep(0)}
                        >
                          1 Reciever Details
                        </Tab>
                        <Tab
                          isDisabled={currentStep === 0}
                          _selected={{
                            borderBottom: "2px solid black", // Change the bottom border color for the active tab
                            color: "black", // Change the text color for the active tab
                          }}
                        >
                          2 Address
                        </Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <VStack spacing={4} align="stretch">
                            <Text>Name:</Text>
                            <Input
                              type="tel"
                              placeholder="Name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            <Text>Phone:</Text>
                            <Input
                              type="tel"
                              placeholder="Phone Number"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <Text>email:</Text>
                            <Input
                              type="tel"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            {/* <Button
                    colorScheme="blue"
                    onClick={handleNextStep}
                  >
                    Next Step
                  </Button> */}
                          </VStack>
                        </TabPanel>
                        <TabPanel>
                          <VStack spacing={4} align="stretch">
                            <Text>Address Line 1:</Text>
                            <Input
                              type="text"
                              placeholder="Enter Address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                            <Text>City:</Text>
                            <Input
                              type="text"
                              placeholder="Enter City"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                            <Text>Pincode:</Text>
                            <Input
                              type="text"
                              placeholder="Enter Pincode"
                              value={pincode}
                              onChange={(e) => setPincode(e.target.value)}
                            />
                          </VStack>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </ModalBody>
                  <ModalFooter>
                    {currentStep === 0 ? (
                      <Button
                        bg="black"
                        _hover={{}}
                        color="white"
                        onClick={handleNextStep}
                        isDisabled={!name || !phoneNumber || !email}
                      >
                        Next Step
                      </Button>
                    ) : (
                      <Button
                        bg="black"
                        _hover={{}}
                        color="white"
                        onClick={handleDone}
                        isDisabled={!address || !city || !pincode}
                      >
                        Done
                      </Button>
                    )}
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default ShoppingCartDrawer;
