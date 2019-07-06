/* eslint-disable no-undef */

document.uploadForm.onsubmit = async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  const config = {
    method: 'post',
    body: data,
  };

  return fetch('/upload', config);
};
