import React, { useEffect } from 'react';
import API from '../../general/Api';
import { ApiContext } from '../../../context/ApiContext';
import { ApiContextType } from '../../../types/ApiTypes';
import Button from '../../general/components/Button/Button';
import ButtonCancel from '../../general/components/Button/ButtonCancel';
import ButtonDelete from '../../general/components/Button/ButtonDelete';
import EditParameterForm from './EditParameterForm';
import GetTableHeaderRow from '../../general/components/Table/GetTableHeaderRow';
import GetTableRow from '../../general/components/Table/GetTableRow';
import Modal from '../../general/components/Modal/Modal';
import AddDependencies from '../../addDependencies/components/AddDependencies';
import '../styles/EditDefaultConfig.css';
import '../styles/EditDefaultConfigTable.css';
import { useSearchParams } from 'react-router-dom';

function EditDefaultConfig() {
  const { templateConfigs, springConfig, setSpringConfig } = React.useContext(ApiContext) as ApiContextType;
  const [springModalActive, setSpringModalState] = React.useState(false);
  const [javaModalActive, setJavaModalState] = React.useState(false);
  const [addDependencyModalActive, setAddDependencyModalState] = React.useState(false);

  const [searchParams] = useSearchParams();
  const getTemplateConfigByType = (type: string | null) => {
    API.makeRequest({
      endpoint: `templates/configs/${type}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then((response) => {
        if (response.data) setSpringConfig(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const configType = searchParams.get('type');
    getTemplateConfigByType(configType);
  }, []);

  const handleSpringVersionChange = (version: string) => {
    setSpringConfig({ ...springConfig, defaultSpringBootVersion: version });
  };

  const handleDeleteSpringVersion = (version: string) => {
    if (springConfig !== null
        && springConfig.springBootVersions
        && springConfig.springBootVersions.length) {
      setSpringConfig({
        ...springConfig,
        springBootVersions: springConfig.springBootVersions.filter((v) => v !== version),
      });
    }
  };

  const handleSaveChanges = () => {
    if (springConfig !== null) {
      API.makeRequest({
        endpoint: `templates/configs/${springConfig.type}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        },
        body: springConfig,
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  console.log(templateConfigs);
  console.log(springConfig);

  return (
    <div className="edit-default-config">
      <div className="edit-default-config__body">
        <h2>Edit default configuration</h2>
        <table className="edit-default-config__table">
          <thead>{GetTableHeaderRow('Parameter', 'Value', 'Actions')}</thead>
          <tbody>
            {GetTableRow(
              'Spring Boot',
              springConfig.defaultSpringBootVersion,
              <Button label="Edit" onClick={() => setSpringModalState(true)} />,
            )}
            {GetTableRow(
              'Java',
              springConfig.defaultJavaVersion,
              <Button label="Edit" onClick={() => setJavaModalState(true)} />,
            )}
          </tbody>
        </table>

        <div className="dependency-table-title">
          <h3>Dependencies</h3>
          <Button label="Add dependencies" onClick={() => setAddDependencyModalState(true)} />
        </div>
        <table className="edit-default-config__table">
          <thead>
            {GetTableHeaderRow('GroupID', 'ArtifactID', 'Latest version', 'Actions')}
          </thead>
          <tbody>

            {springConfig.defaultDependencies.map(
              (dependency) => (
                GetTableRow(
                  dependency.groupId,
                  dependency.artifactId,
                  dependency.version,
                  <ButtonDelete onClick={() => setAddDependencyModalState(true)} />,
                )
              ),
            )}
          </tbody>
        </table>

        <div className="edit-default-config__form-footer">
          <ButtonCancel
            label="Cancel"
            onClick={() => {
            }}
          />
          <Button
            label="Save changes"
            onClick={handleSaveChanges}
          />
        </div>
      </div>

      <Modal
        isActive={springModalActive}
        setModalState={setSpringModalState}
      >
        <div className="edit-default-config__modal">
          <h3>Select Spring Boot version</h3>
          <EditParameterForm
            onChanged={handleSpringVersionChange}
            onItemListDeleted={handleDeleteSpringVersion}
            labelArr={springConfig?.springBootVersions}
          />
          <Button
            label="Save"
            onClick={() => {
            }}
          />
        </div>
      </Modal>

      {/* Временно убрали
      <Modal isActive={javaModalActive} setModalState={setJavaModalState}>
        <div className="edit-default-config__modal">
          <h3>Select Java version</h3>
          <EditParameterForm onChanged={} labelArr={javaVersions} />
          {Button('Save', () => {})}
        </div>
      </Modal>
      */}

      <Modal
        isActive={addDependencyModalActive}
        setModalState={setAddDependencyModalState}
      >
        <AddDependencies
          dependencies={springConfig.defaultDependencies}
          setDependencies={(newDeps) => setSpringConfig({ ...springConfig, defaultDependencies: newDeps })}
          setModalState={setAddDependencyModalState}
        />
      </Modal>
    </div>
  );
}

export default EditDefaultConfig;
