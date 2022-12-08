import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import API from '../../../general/Api';

import Button from '../../../general/components/Button/Button';
import ButtonCancel from '../../../general/components/Button/ButtonCancel';

import '../../styles/EditTemplate.css';
import '../../styles/Table.css';
import TemplateParameters from './TemplateParameters';
import TemplateDependencies, { Dependency } from './TemplateDependencies';

export interface Template {
    availableVersions: Array<number>,
    dependencies: Array<Dependency>,
    description: string,
    id: number,
    javaVersion: number,
    springBootVersion: string,
    springBootVersions: Array<string>,
    title: string,
    type: string,
}

function EditTemplate() {
  const [template, setTemplate] = useState<Template>({
    availableVersions: [],
    dependencies: [],
    description: '',
    id: -1,
    javaVersion: 0,
    springBootVersion: '',
    springBootVersions: [],
    title: '',
    type: '',
  });
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const templateId = searchParams.get('id');

    API.makeRequest({
      endpoint: `templates/${templateId}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then((response: any) => {
        console.log(response.data);
        setTemplate(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="edit-template">
      <div className="edit-template__body">
        <h2>
          Edit template:
          {' '}
          {template.title}
        </h2>
        <TemplateParameters template={template} />

        <TemplateDependencies template={template} />

        <div className="edit-template__form-footer">
          <ButtonCancel label="Cancel" onClick={() => {}} />
          <Button label="Save changes" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default EditTemplate;