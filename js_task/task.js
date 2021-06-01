(() => {
  let data = [
    { id: "borad-0", class: "task", title: "タスク" },
    { id: "borad-1", class: "progres", title: "進行中" },
    { id: "borad-2", class: "done", title: "完了" },
  ];

  let taskid = 0;
  let kanban;

  document.forms.wrap.new.addEventListener("click", createKanban);
  document.forms.wrap.import.addEventListener("change", importFile);
  document.getElementById("download").addEventListener("click", downloadJSON);

  function createKanban() {
    kanban = new jKanban({
      element: "#kanban",
      boards: data,
      responsivePercentage: true,
      itemAddOptions: {
        enabled: true,
        content: "追加",
      },

      click: (element) => kanban.removeElement(element.dataset.eid),
      buttonClick: (element, id) => addTask(id),
    });
    idCheck(data);

    document.forms.wrap.style.display = "none";
    document.getElementById("download").style.display = "block";
    document.getElementById("reset").style.display = "block";
    document.getElementById("box11").style.display = "block";

  }
  function idCheck(data) {
    data.forEach((list) => {
      if (!list.item) return;
      taskid += list.item.length;
    });
  }

  function importFile(event) {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    reader.onload = () => {
      data = JSON.parse(reader.result);
      createKanban();
    };
  }
  function downloadJSON() {
    const blobData = new Blob([JSON.stringify(createDATA())], {
      type: "application/json",
    });
    document.getElementById("download").href =
      window.URL.createObjectURL(blobData);
  }
  function createDATA() {
    const jkanbanData = [];

    for (let i = 0; i < data.length; i++) {
      const boardLists = {
        id: data[i].id,
        title: data[i].title,
        item: [],
      };
      kanban.getBoardElements(data[i].id).forEach((item) => {
        boardLists.item.push({
          id: item.dataset.eid,
          title: item.textContent,
        });
      });
      jkanbanData.push(boardLists);
    }
    return jkanbanData;
  }

  function addTask(id) {
    const task = document.createElement("form");
    task.innerHTML = '<input id="FOCUS" type="text">';
    kanban.addForm(id, task);
    document.getElementById("FOCUS").focus();

    task.addEventListener("submit", (e) => {
        kanban.addElement(id, {
          id: `item-${taskid++}`,
          title: e.target[0].value,
        });

      task.remove();
    });
  }
})();
