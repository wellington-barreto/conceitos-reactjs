import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  const loadRepositories = async () => {
    const { data } = await api.get("/repositories");
    setRepositories(data);
  };


  useEffect(() => {
    loadRepositories();
  } , []);

  async function handleAddRepository() {
     const response = await  api.post('repositories', {
       title: `New Repository ${Date.now()}`,
     url: "http://w3b.api",
     techs: []
    });


  setRepositories([...repositories, response.data]);
   
  }



  async function handleRemoveRepository(id) {
      await api.delete(`repositories/${id}`);
      setRepositories(repositories.filter((repository) => repository.id !== id));

  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => 
        <li key={repository.title}>
         {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
         )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
