import * as yup from 'yup';
import Edit from './edit';
import Toolbar from './edit/Toolbar';

const schema = {
  title: yup.string().trim().min(1).max(500).required(),
  url: yup.string().trim().min(1).max(500).required()
};

export default {
  name: 'External Link',
  type: 'EXTERNAL_LINK',
  version: '1.0',
  schema,
  initState: () => ({ title: '', url: '' }),
  Edit,
  Toolbar,
  ui: {
    icon: 'mdi-open-in-new',
    forceFullWidth: true
  }
};
