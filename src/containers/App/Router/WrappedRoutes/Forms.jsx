import React from 'react';
import { Route, Switch } from 'react-router-dom';

import BasicForm from '../../../EasyDev/Form/BasicForm/index';
import CheckFormControls from '../../../EasyDev/Form/CheckFormControls/index';
import FileUpload from '../../../EasyDev/Form/FileUpload/index';
import FloatingLabelsForm from '../../../EasyDev/Form/FloatingLabelsForm/index';
import FormDropzone from '../../../EasyDev/Form/FormDropzone/index';
import FormLayouts from '../../../EasyDev/Form/FormLayouts/index';
import FormPicker from '../../../EasyDev/Form/FormPicker/index';
import FormValidation from '../../../EasyDev/Form/FormValidation/index';
import MaskForm from '../../../EasyDev/Form/MaskForm/index';
import MaterialForm from '../../../EasyDev/Form/MaterialForm/index';
import WizardForm from '../../../EasyDev/Form/WizardForm/index';

export default () => (
  <Switch>
    <Route path="/org/forms/basic_form" component={BasicForm} />
    <Route path="/org/forms/check_form_controls" component={CheckFormControls} />
    <Route path="/org/forms/file_upload" component={FileUpload} />
    <Route path="/org/forms/floating_labels_form" component={FloatingLabelsForm} />
    <Route path="/org/forms/form_dropzone" component={FormDropzone} />
    <Route path="/org/forms/form_layouts" component={FormLayouts} />
    <Route path="/org/forms/form_picker" component={FormPicker} />
    <Route path="/org/forms/form_validation" component={FormValidation} />
    <Route path="/org/forms/mask_form" component={MaskForm} />
    <Route path="/org/forms/material_form" component={MaterialForm} />
    <Route path="/org/forms/wizard_form" component={WizardForm} />
  </Switch>
);
