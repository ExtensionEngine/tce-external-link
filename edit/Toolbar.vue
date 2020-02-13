<template>
  <div class="tce-external-link-toolbar">
    <div class="input-group">
      <div class="row">
        <div :class="{ 'has-error': vErrors.has('title') }" class="col-xs-6">
          <input
            v-validate="{ required: true, min: 1, max: 500 }"
            v-model.trim="title"
            :disabled="!edit"
            class="form-control"
            name="title"
            type="text"
            placeholder="Title">
          <span v-show="vErrors.has('title')" class="help-block">
            {{ vErrors.first('title') }}
          </span>
        </div>
        <div :class="{ 'has-error': vErrors.has('url') }" class="col-xs-6">
          <input
            v-validate="{ required: true, url: true, min: 1, max: 500 }"
            v-model.trim="url"
            :disabled="!edit"
            class="form-control"
            name="url"
            type="text"
            placeholder="URL">
          <span v-show="vErrors.has('url')" class="help-block">
            {{ vErrors.first('url') }}
          </span>
        </div>
      </div>
    </div>
    <button
      v-if="!edit"
      @click="edit = true"
      class="btn btn-default"
      type="button">
      Edit
    </button>
    <button
      v-if="edit"
      @click="save"
      class="btn btn-success"
      type="button">
      Save
    </button>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';
import pick from 'lodash/pick';
import { withValidation } from 'utils/validation';

const props = ['title', 'url'];

export default {
  name: 'tce-external-link-toolbar',
  mixins: [withValidation()],
  props: {
    element: { type: Object, required: true }
  },
  data() {
    return {
      edit: isEmpty(pick(this.element.data, props)),
      title: '',
      url: '',
      ...cloneDeep(this.element.data)
    };
  },
  methods: {
    save() {
      this.$validator.validateAll().then(isValid => {
        if (!isValid) return;
        this.edit = false;
        const element = cloneDeep(this.element);
        Object.assign(element.data, pick(this, props));
        this.$emit('save', element);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.tce-external-link-toolbar {
  position: relative;
  z-index: 999;
  width: 100%;
  height: 60px;
  padding: 13px 45px 0;
}

.input-group {
  display: block;
  width: 100%;
  float: left;
  margin-right: -200px;
  padding-right: 200px;
}

.form-control {
  padding: 0 7px;
  background: transparent;
}

.btn {
  position: relative;
  z-index: 1;
  padding: 6px 15px;
  font-size: 11px;

  &:active {
    outline: none;
  }
}
</style>
