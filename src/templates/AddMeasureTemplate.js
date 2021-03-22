import React, {useState} from 'react';

import {Button, Icon, Text, Layout} from '@ui-kitten/components';

import {MeasureList} from '../organisms/MeasureList';

import AddMeasureForm from '../organisms/AddMeasureForm';

const AddMeasureTemplate = () => {
  return (
    <Layout style={{height: '100%'}}>
      <AddMeasureForm />
    </Layout>
  );
};

export default AddMeasureTemplate;
