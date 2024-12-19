import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// Définit le nombre d'emplacements par ligne
const NUM_POSITIONS = 5; // Nombre de positions dans chaque ligne

const Palettes = () => {
  const [palettes, setPalettes] = useState([]);
  const [newPaletteName, setNewPaletteName] = useState("");

  const addPalette = () => {
    const nouvellePalette = {
      id: `${palettes.length + 1}`,
      nom: newPaletteName,
      size: "120x80",
      position: { row: 0, index: palettes.length % NUM_POSITIONS }, // Initial position in row 0
    };
    setPalettes([...palettes, nouvellePalette]);
    setNewPaletteName(""); // Reset input after adding a palette
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const updatedPalettes = [...palettes];
    const [movedItem] = updatedPalettes.splice(source.index, 1);
    movedItem.position = {
      row: destination.droppableId,
      index: destination.index,
    };
    updatedPalettes.splice(destination.index, 0, movedItem);

    setPalettes(updatedPalettes);
  };

  // Créer des lignes d'emplacements (étagères)
  const generateRows = () => {
    const rows = [];
    const numRows = Math.ceil(palettes.length / NUM_POSITIONS);
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
      rows.push(
        <Droppable droppableId={`${rowIndex}`} key={rowIndex}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="row"
            >
              {palettes
                .filter((palette) => palette.position.row === rowIndex)
                .map((palette, index) => (
                  <Draggable
                    key={palette.id}
                    draggableId={palette.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="palette"
                      >
                        {palette.nom}
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      );
    }
    return rows;
  };

  return (
    <div className="remorque-container">
      <h1>Gestion des Palettes</h1>
      <input
        type="text"
        value={newPaletteName}
        onChange={(e) => setNewPaletteName(e.target.value)}
        placeholder="Nom de la palette"
      />
      <button className="btn-ajouter" onClick={addPalette}>Ajouter Palette</button>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="remorque">{generateRows()}</div>
      </DragDropContext>
    </div>
  );
};

export default Palettes;
