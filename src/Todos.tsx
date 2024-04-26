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

const Todos: React.FC<AppProps> = ({ signOut, user }) => {
  const [formState, setFormState] = useState<CreateTodoInput>(initialState);
  const [todos, setTodos] = useState<Todo[] | CreateTodoInput[]>([]);

  const [formStateUpdate, setFormStateUpdate] = useState<UpdateTodoInput>(initialStateUpdate);
  const [todosUpdate, setTodosUpdate] = useState<Todo[] | UpdateTodoInput[]>([]);

  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const [deleteTodoId, setDeleteTodoId] = useState<string | null>(null);

  


  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await client.graphql({
        query: listTodos,
      });
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return;
      const todo = { ...formState };
      setTodos([...todos, todo]);
      setFormState(initialState);
      await client.graphql({
        query: createTodo,
        variables: {
          input: todo,
        },
      });
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  async function editTodo() {
    try {
      if (!formStateUpdate.id || !formStateUpdate.name || !formStateUpdate.description) return;
      const todo = { ...formStateUpdate };
      setTodosUpdate([...todosUpdate, todo]);
      setFormStateUpdate(initialStateUpdate);
      await client.graphql({
        query: updateTodo,
        variables: {
          input: todo,
        },
      });
      fetchTodos(); // Refresh todos after update
      setEditTodoId(null);
      
    } catch (err) {
      console.log("error updating todo:", err);
    }
  }

 


  const handleEdit = (todoId: any) => {
    const selectedTodo = todos.find((todo) => todo.id === todoId);
    if (selectedTodo) {
      setFormStateUpdate({ id: selectedTodo.id || "", name: selectedTodo.name, description: selectedTodo.description });
      setEditTodoId(todoId);
    }
  };

  const resetFeildsEdit= (todoId: any) => {
    setEditTodoId(null);
  }
  const resetFeildsDelete= (todoId: any) => {
    setDeleteTodoId(null);
  }

  const handleDelete = (todoId: string) => {
    setDeleteTodoId(todoId);
  };

  async function confirmDeleteTodo() {
    try {
      await client.graphql({
        query: deleteTodo, // Replace 'deleteTodo' with your actual mutation
        variables: { input: { id: deleteTodoId || "" } },
      });
      setDeleteTodoId(null);
      fetchTodos(); // Refresh todos after delete
    } catch (err) {
      console.log("error deleting todo", err);
    }
  };


  

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
    <Heading level={1} color={"purple.60"}>Todos of InspireAI</Heading>
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
     <h2>Amplify Todos</h2>
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
      
      <Button variation="primary" onClick={addTodo}>Create Todo</Button>

      <h2>All Todos</h2>

<Table
  caption=""
  highlightOnHover={false}>
  <TableHead>
    <TableRow>
      <TableCell as="th">Name</TableCell>
      <TableCell as="th">Description</TableCell>
      <TableCell as="th">Action</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
      {todos.map((todo, index) => (
            <TableRow key={todo.id ? todo.id : index} style={styles.todo}>
            <TableCell>{todo.name}</TableCell>
            <TableCell>{todo.description}</TableCell>
            <TableCell>
                {editTodoId === todo.id  ? (
                 
                  <>
                    <input
                    style={{
                      border: "none",
                      backgroundColor: "#ddd",
                      marginBottom: 10,
                      padding: 8,
                      fontSize: 18,
                    }}
                      type="text"
                      placeholder={todo.name}
                      value={formStateUpdate.name || ""}
                      onChange={(e) => setFormStateUpdate({ ...formStateUpdate, name: e.target.value })}
                    /><br></br>
                    <input
                    style={{
                      border: "none",
                      backgroundColor: "#ddd",
                      marginBottom: 10,
                      padding: 8,
                      fontSize: 18,
                    }}
                      type="text"
                      placeholder={todo.description || ""}
                      value={formStateUpdate.description || ""}
                      onChange={(e) => setFormStateUpdate({ ...formStateUpdate, description: e.target.value })}
                    /><br></br>
                    
                    <Button onClick={resetFeildsEdit} marginLeft={90} marginRight={10} color={""}>Cancel</Button>
                    <Button onClick={editTodo} color={"green.60"}>Save</Button><br></br>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEdit(todo.id)}  marginRight={10}>Edit</Button>
                    {deleteTodoId === todo.id ? (
                  <>
                    
                    <br></br>
                    <p style={{color:"tomato"}}>Are you sure you want to delete this?</p>
                    <Button onClick={resetFeildsDelete} marginLeft={90} marginRight={10} color={""}>Cancel</Button>
                    <Button onClick={confirmDeleteTodo} color={"red.60"}>Delete</Button><br></br>
                  </>
                ) : (
                  <>
                    <Button color={"red.60"} onClick={() => handleDelete(todo.id || "")}>Delete</Button>
                  </>
                )}
                  </>
                )}


              </TableCell>
            </TableRow>
      ))}
  </TableBody>
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

export default withAuthenticator(Todos);