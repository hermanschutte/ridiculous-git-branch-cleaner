$(document).ready(function() {

    $('.branch-delete')
        .off('click')
        .on('click', function() {
            var ele = $(this);

            $.ajax({
                type: 'DELETE',
                url: '/branches',
                data: {
                    branchname: $(this).attr('data-branch')
                },
                success: function(response) {
                    if (response.status = 'ok') {
                        ele.parent().remove();
                    }
                }
            })
        });

});