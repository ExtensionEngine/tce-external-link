<template>
  <div class="tce-external-link">
    <div v-if="showPlaceholder">
      <div class="well external-link-placeholder">
        <div class="message">
          <span class="heading">External link placeholder</span>
          <span v-if="!isFocused">Select to edit</span>
          <span v-else>Please use toolbar to change link parameters</span>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="preview">
        <div class="title">{{ title }}</div>
        <a :href="url" target="_blank">{{ url }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get';

export default {
  name: 'tce-external-link',
  props: {
    element: { type: Object, required: true },
    isFocused: { type: Boolean, default: false }
  },
  computed: {
    showPlaceholder() {
      return !this.title || !this.url;
    },
    title() {
      return get(this.element, 'data.title');
    },
    url() {
      return get(this.element, 'data.url');
    }
  }
};
</script>

<style lang="scss" scoped>
.external-link-placeholder {
  .message {
    padding: 15px;

    .heading {
      font-size: 24px;
    }

    span {
      display: block;
      font-size: 18px;
    }
  }
}

.preview {
  padding: 10px 15px;
  text-align: left;
  font-size: 16px;

  .title {
    margin-bottom: 10px;
    font-weight: 400;
  }

  .title, a {
    overflow-wrap: break-word;
  }

  a {
    color: #708fbd;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
