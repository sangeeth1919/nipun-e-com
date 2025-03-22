// src/pages/HomePage.js

import React from 'react';
import PageContainer from '../components/Common/PageContainer/PageContainer';
import PageHeader from '../components/Common/PageHeader/PageHeader';
import DataContainer from '../components/Common/DataContainer/DataContainer';

function HomePage() {
  return (
    <PageContainer>
            <PageHeader title='home' subTitle={``} />
            <DataContainer>
            </DataContainer>
        </PageContainer>
  );
}

export default HomePage;
