import { useEffect, useState } from "react";

import { generateClient } from "aws-amplify/api";

import { createTodo } from "./graphql/mutations";
import { updateTodo } from "./graphql/mutations";
import { deleteTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import { type CreateTodoInput, UpdateTodoInput, DeleteTodoInput, type Todo } from "./API";

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
const initialStateUpdate: UpdateTodoInput = { id: "", name: "", description: "" };
const initialStateDelete: DeleteTodoInput = { id: "" };

const client = generateClient();

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

const Profile: React.FC<AppProps> = ({ signOut, user }) => {

  const [formState, setFormState] = useState(initialState);
  
  


  

  const [data, setData] = useState<IData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<IData[]>('http://3.17.147.90:8081/quotes');
        setData(response.data);
        console.log(response.data)
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
    <Heading level={1} color={"purple.60"}>Manage of Profile</Heading>
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
              Manage My Profile
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
              Profile Management
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
    

      <h2>My Profile Data</h2>

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

export default withAuthenticator(Profile);