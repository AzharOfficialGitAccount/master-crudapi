document.addEventListener("DOMContentLoaded", function () {
    const downloadButton = document.getElementById("downloadButton");

    downloadButton.addEventListener("click", function () {

        const apiUrl = "http://localhost:2023/api/v1/user/export-chat-to-excel";

        const downloadLink = document.createElement("a");

        fetch(apiUrl, {
            method: "GET",
            headers: {
            },
        })
            .then((response) => {
                return response.blob();
            })
            .then((blob) => {
                const blobUrl = window.URL.createObjectURL(blob);

                downloadLink.href = blobUrl;
                downloadLink.download = "chat-export.xlsx";
                downloadLink.click();
                window.URL.revokeObjectURL(blobUrl);
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    });
});
