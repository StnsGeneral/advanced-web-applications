import React, { useEffect, useState } from 'react';

import Bubbles from './Bubbles';
import ColorList from './ColorList';

import {
  editColorService,
  deleteColorService,
} from '../services/colorServices';
import { fetchColorService } from '../services/fetchColorService';

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchColorService().then((res) => {
      setColors(res.data);
    });
  }, []);

  const toggleEdit = (value) => {
    setEditing(value);
  };

  const mapColorEdit = (changedColor) => {
    return colors.map((color) => {
      if (Number(color.id) === Number(changedColor.id)) {
        return changedColor;
      } else {
        return color;
      }
    });
  };

  const saveEdit = (editColor) => {
    editColorService(editColor)
      .then((res) => {
        setColors(mapColorEdit(res.data));
      })
      .catch((err) => {
        console.error(`There is an error with edit: ${err}`);
      });
  };

  const filterDeletedColors = (deletedColor) => {
    return colors.filter((color) => {
      return Number(color.id) !== Number(deletedColor);
    });
  };

  const deleteColor = (colorToDelete) => {
    deleteColorService(colorToDelete).then((res) => {
      setColors(filterDeletedColors(res.data));
    });
  };

  return (
    <div className="container">
      <ColorList
        colors={colors}
        editing={editing}
        toggleEdit={toggleEdit}
        saveEdit={saveEdit}
        deleteColor={deleteColor}
      />
      <Bubbles colors={colors} />
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete saveEdit, deleteColor functions
