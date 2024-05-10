import { useEffect, useState } from "react";


import { type CreateTodoInput } from "./API";

import { withAuthenticator, Button, Heading, Breadcrumbs, Card, Grid, Flex, ThemeProvider, View, Image, Text, createTheme, useTheme, Table, TableBody, TableCell, TableHead, TableRow } from "@aws-amplify/ui-react";
import { type AuthUser } from "aws-amplify/auth";
import { type UseAuthenticator } from "@aws-amplify/ui-react-core";
import "@aws-amplify/ui-react/styles.css";

import cover from './assets/cover.jpg';

import axios from 'axios';

interface IData {
  id: number;
  quote: string;
  //email: string;
}

const initialState: CreateTodoInput = { name: "", description: "" };




type AppProps = {
  signOut?: UseAuthenticator["signOut"]; //() => void;
  user?: AuthUser;
};

const theme = createTheme({
    name: 'breadcrumbs-theme',
    tokens: {
      components: {
        breadcrumbs: {
          separator: {
            color: '{colors.secondary.20}',
            fontSize: '{fontSizes.xl}',
            paddingInline: '{space.medium}',
          },
          link: {
            current: {
              color: '{colors.secondary.80}',
            },
          },
        },
      },
    },
  });

const Quotes: React.FC<AppProps> = ({ signOut }) => {

  const [formState, setFormState] = useState(initialState);
  
  


  

  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<IData[]>('http://3.17.147.90:8081/quotes');
        setData(response.data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  

 

 


  

  const { tokens } = useTheme();

  return (
    <div style={styles.container}>
     









<Grid
  columnGap="0.5rem"
  rowGap="0.5rem"
  templateColumns="1fr 1fr 1fr"
  
>
  <Card
    columnStart="1"
    columnEnd="-1"
    textAlign={"right"}
  >
    <ThemeProvider theme={theme}>
    <Breadcrumbs
      items={[
        {
          href: '/',
          label: 'Home',
        },
        {
          href: '/todos',
          label: 'Todos',
        },
        {
          href: '/quotes',
          label: 'Quotes',
        },
        {
          href: '/profile',
          label: 'Profile',
        },
        {
          label: '',
        },
      ]}
      separator={<Breadcrumbs.Separator>|</Breadcrumbs.Separator>}
    />
    </ThemeProvider>
  </Card>
  <Card
    columnStart="1"
    columnEnd="-1"
    textAlign={"right"}
  >
  
  </Card>
  <Card
    columnStart="1"
    columnEnd="2"
  >
    <Heading level={1} color={"purple.60"}>Quotes of InspireAI</Heading>
      {/*<h2>Welcome to InspireAI</h2>*/}

      <View
      backgroundColor={tokens.colors.background.secondary}
      padding={tokens.space.medium}
    >
      <Card>
        <Flex direction="row" alignItems="flex-start">
          <Image
            alt="Road to milford sound"
            src={cover}
            width="33%"
          />
          <Flex
            direction="column"
            alignItems="flex-start"
            gap={tokens.space.xs}
          >
            {/*<Flex>
              <Badge size="small" variation="info">
                Plus
              </Badge>
              <Badge size="small" variation="success">
                Verified
              </Badge>
            </Flex>*/}

            <Heading level={5}>
              Inspirational Quotes
            </Heading>

            <Text as="span">
              Join with us to view Inspirational Quotes.
            </Text>
            <Button variation="primary">View Now</Button>
          </Flex>
        </Flex>
      </Card>
      </View>


      <View
      backgroundColor={tokens.colors.background.secondary}
      padding={tokens.space.medium}
    >
      <Card>
        <Flex direction="row" alignItems="flex-start">
          <Image
            alt="Road to milford sound"
            src={cover}
            width="33%"
          />
          <Flex
            direction="column"
            alignItems="flex-start"
            gap={tokens.space.xs}
          >
            {/*<Flex>
              <Badge size="small" variation="info">
                Plus
              </Badge>
              <Badge size="small" variation="success">
                Verified
              </Badge>
            </Flex>*/}

            <Heading level={5}>
              Profile
            </Heading>

            <Text as="span">
              Keep update your profile to recieving the ideal Quotes as you need.
            </Text>
            <Button variation="primary">See My profile</Button>
          </Flex>
        </Flex>
      </Card>
      </View>
  </Card>
  <Card
    columnStart="2"
    columnEnd="-1"
  >
     <h2>Microservices Quotes</h2>

     <input
        onChange={(event) =>
          setFormState({ ...formState, name: event.target.value })
        }
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      /><br></br>
      <input
        onChange={(event) =>
          setFormState({ ...formState, description: event.target.value })
        }
        style={styles.input}
        value={formState.description as string}
        placeholder="Description"
      /><br></br>
      
      
      <Button variation="primary" >Create Quote</Button>

      <h2>All Quotes</h2>

<Table
  caption=""
  highlightOnHover={false}>
  <TableHead>
    <TableRow>
      <TableCell as="th">Title</TableCell>
      <TableCell as="th">Quote</TableCell>
      <TableCell as="th">Action</TableCell>
    </TableRow>
  </TableHead>
  <TableBody></TableBody>
  
</Table>



  
  
      
  </Card>
  <Card
    columnStart="2"
    columnEnd="-1"
    textAlign={"right"}
  >
    <Button onClick={signOut} color={"red.60"}>Sign out</Button> 
  </Card>
</Grid>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
  },
  todo: { marginBottom: 15 },
  input: {
    border: "none",
    backgroundColor: "#ddd",
    marginBottom: 10,
    padding: 8,
    fontSize: 18,
  },
  todoName: { fontSize: 20, fontWeight: "bold" },
  todoDescription: { marginBottom: 0 },
  button: {
    backgroundColor: "black",
    color: "white",
    outline: "none",
    fontSize: 18,
    padding: "12px 0px",
  },
} as const;

export default withAuthenticator(Quotes);