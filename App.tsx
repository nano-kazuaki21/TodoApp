import React, { FC, Fragment, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator
} from "react-native";

type Todo = {
  id: number;
  title: string;
  description: string;
  done: boolean;
};

const SAMPLE_TODOS: Todo[] = [
  {
    id: 1,
    title: "todo 1",
    description: "description 1",
    done: false
  },
  {
    id: 2,
    title: "todo 2",
    description: "description 2",
    done: false
  },
  {
    id: 3,
    title: "todo 3",
    description: "description 3",
    done: false
  }
];

type Mode = "list" | "add";

const App: FC = () => {
  const [ready, setReady] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [mode, setMode] = useState<Mode>("list");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const getReady = () => {
    setTodos(SAMPLE_TODOS);

    setReady(true);
  };

  const addTodo = (todo: Todo) => {
    setTodos(todos => [...todos, todo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos => todos.filter(todo => todo.id !== id));
  };

  const changeMode = (mode: Mode) => {
    setMode(mode);
  };

  const resetInput = () => {
    setTitle("");
    setDescription("");
  };

  const handleDelete = (id: number) => {
    deleteTodo(id);
  };

  const handlePlus = () => {
    changeMode("add");
  };

  const handleCancel = () => {
    changeMode("list");
  };

  const handleAdd = () => {
    if (!title || !description) return;

    const newTodo: Todo = {
      id: todos.length === 0 ? 1 : todos[todos.length - 1].id + 1,
      title,
      description,
      done: false
    };
    addTodo(newTodo);

    changeMode("list");
  };

  useEffect(() => {
    getReady();
  }, []);

  useEffect(() => {
    if (mode === "list") {
      resetInput();
    }
  }, [mode]);

  return (
    <Fragment>
      <SafeAreaView style={styles.safearea}>
        <View style={styles.container}>
          <View style={styles.title_container}>
            <Text style={styles.title}>Todo List</Text>
          </View>
          <View style={styles.plus_button}>
            <TouchableOpacity onPress={handlePlus}>
              <Text style={styles.plus}>+</Text>
            </TouchableOpacity>
          </View>
          {ready ? (
            <FlatList
              data={todos}
              renderItem={({ item: todo }) => {
                return (
                  <View style={styles.todo}>
                    <View>
                      <Text style={styles.todo_title}>{todo.title}</Text>
                      <Text style={styles.todo_description}>
                        {todo.description}
                      </Text>
                    </View>
                    <View style={styles.cross_button}>
                      <TouchableOpacity onPress={() => handleDelete(todo.id)}>
                        <Text style={styles.cross}>×</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
              ListEmptyComponent={() => (
                <View style={styles.empty_container}>
                  <Text style={styles.empty}>Add Todo !!</Text>
                </View>
              )}
              keyExtractor={(_, index) => index.toString()}
            />
          ) : (
            <View style={styles.loading_container}>
              <ActivityIndicator size={"large"} />
            </View>
          )}
        </View>
      </SafeAreaView>
      <Modal visible={mode === "add"} animationType={"slide"}>
        <View style={styles.modal}>
          <View style={styles.cancel_button}>
            <TouchableOpacity onPress={handleCancel}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
          <Text style={[styles.title, styles.title_add_todo]}>Add Todo</Text>
          <View style={styles.textinput_frame}>
            <TextInput
              placeholder={"Title"}
              value={title}
              onChangeText={text => setTitle(text)}
              style={styles.textinput}
            />
          </View>
          <View style={styles.textinput_frame}>
            <TextInput
              placeholder={"Description"}
              value={description}
              onChangeText={text => setDescription(text)}
              style={styles.textinput}
            />
          </View>
          <View style={styles.add_button}>
            <TouchableOpacity onPress={handleAdd}>
              <Text style={styles.add}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Fragment>
  );
};

export default App;

const styles = StyleSheet.create({
  safearea: {
    flex: 1
  },
  container: {
    flex: 1
  },
  title_container: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "gray"
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "royalblue",
    alignSelf: "center"
  },
  title_add_todo: {
    marginBottom: 40
  },
  plus_button: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 30
  },
  plus: {
    fontSize: 32,
    fontWeight: "bold",
    color: "royalblue"
  },
  loading_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  empty_container: {
    marginTop: 20,
    alignItems: "center"
  },
  empty: {
    fontSize: 20,
    fontWeight: "400",
    color: "darkgray"
  },
  todo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderColor: "gray"
  },
  todo_title: {
    fontSize: 24
  },
  todo_description: {
    fontSize: 16,
    marginTop: 5
  },
  cross_button: {
    alignItems: "center",
    justifyContent: "center"
  },
  cross: {
    fontSize: 32,
    color: "coral"
  },
  separator: {
    height: 1,
    backgroundColor: "gray"
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  cancel_button: {
    position: "absolute",
    top: 60,
    right: 30
  },
  cancel: {
    fontSize: 22,
    color: "royalblue"
  },
  textinput_frame: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30
  },
  textinput: {
    width: 200,
    height: 40,
    fontSize: 24
  },
  add_button: {
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "royalblue",
    marginTop: 50
  },
  add: {
    fontSize: 24,
    color: "white"
  }
});
