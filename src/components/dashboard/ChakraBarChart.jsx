import { Box, Flex, Text } from '@chakra-ui/react';

const ChakraBarChart = () => {
  const chartData = [
    { label: 'New Leads', value: 12 },
    { label: 'Contacted', value: 8 },
    { label: 'Converted', value: 5 },
    { label: 'Lost', value: 3 },
  ];
  
  const maxValue = Math.max(...chartData.map(item => item.value));

  return (
    <Box width="100%" maxW="600px" mx="auto" mt={6}>
      {chartData.map((item, index) => (
        <Flex key={index} align="center" mb={3}>
          <Text w="120px" fontWeight="medium">{item.label}</Text>
          <Box
            h="24px"
            bg="teal.400"
            borderRadius="md"
            width={`${(item.value / maxValue) * 100}%`}
            transition="width 0.3s ease"
          />
          <Text ml={3} minW="30px">{item.value}</Text>
        </Flex>
      ))}
    </Box>
  );
};

export default ChakraBarChart;
