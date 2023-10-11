import React, { useState } from 'react';
import './App.scss';
import TodoTable from './components/TodoTable/TodoTable';
import TodoModal from './components/TodoModal/TodoModal';

function App() {
  const [isShowModal, setIsShowModal] = useState(false);
  
  return (
    <div className="App">
      {isShowModal && (
        <TodoModal 
          onCloseModal={() => setIsShowModal(false)}
        />
      )}

      <TodoTable 
        onShowModal={() => setIsShowModal(true)}
      />
    </div>
  );
}

export default App;
