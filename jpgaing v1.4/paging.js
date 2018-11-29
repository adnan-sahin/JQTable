//JQuery Paging Plugin v1.5
//Written By Adnan ŞAHİN

(function($) {
  "use strict";

  $.fn.JPaging = function(param) {
    var params = $.extend({ pageSize: 10, pageNumberSize: 5 }, param);

    var $pageSize = params.pageSize;

    var $pageNumberSize = params.pageNumberSize;

    var $thisBody = $(this).find("tbody");
    var $thisAllTr = $thisBody.find("tr");

    $("<div id='paging'></div>").insertAfter(this);

    var $countRow = $thisAllTr.length;
    console.log("countTr:" + $countRow);

    var $currentIndex = 2;
    var $pageCount = Math.round($countRow / $pageSize);
    if ($countRow > 0) {
      if ($pageSize * $pageCount < $countRow) {
        $pageCount++;
      }
    }
    if ($pageNumberSize == 0) {
      $pageNumberSize = 1;
    }
    if ($pageNumberSize >= $pageCount) {
      $pageNumberSize = $pageCount;
      $currentIndex = 1;
    }

    //sayfa linkleri
    if ($pageCount >= 1 && $pageNumberSize >= 1) {
      $("#paging").append(
        "<a href='javascript:void(0)' style='font-weight:700;'>" + "<"
      );
      if ($pageCount > $pageNumberSize) {
        $("#paging").append(
          "<a href='javascript:void(0)' id='pre_point' class='hidden'>" + "..."
        );
      }

      for (var i = 1; i <= $pageCount; i++) {
        if (i <= $pageNumberSize) {
          $("#paging").append("<a href='javascript:void(0)'>" + i + "</a>");
        } else if (i > $pageNumberSize) {
          $("#paging").append(
            "<a href='javascript:void(0)' class='hidden'>" + i + "</a>"
          );
        }
      }
      if ($pageCount > $pageNumberSize) {
        $("#paging").append(
          "<a href='javascript:void(0)' id='next_point'>" + "..."
        );
      }
      $("#paging").append(
        "<a href='javascript:void(0)' style='font-weight:700;'>" + ">"
      );

      $thisBody.find("tr:gt(" + ($pageSize - 1) + ")").hide();
      $("#paging a:eq(" + $currentIndex + ")").addClass("aktif");
    }
    $("#pre_point").on("click", function(event) {
      event.preventDefault();

      if ($currentIndex <= 1) {
        return false;
      }

      var prevIndex = $(this)
        .nextAll("a:not('.hidden,#next_point')")
        .first()
        .index();
      var hideIndex = prevIndex + $pageNumberSize - 1;
      $("#paging a:eq(" + hideIndex + ")").addClass("hidden");
      $("#paging a").removeClass("aktif");
      $("#paging a:eq(" + (prevIndex - 1) + ")")
        .removeClass("hidden")
        .addClass("aktif");
      $currentIndex = prevIndex - 1;
      var gt = $pageSize * ($currentIndex - 1);
      $thisAllTr.hide();
      for (var i = gt - $pageSize; i < gt; i++) {
        $thisAllTr.eq(i).show();
      }
      if ($currentIndex - 1 == $pageCount && $pageNumberSize < $pageCount) {
        $("#next_point").addClass("hidden");
      } else if (
        $currentIndex < $pageCount + $pageNumberSize &&
        $pageNumberSize < $pageCount
      ) {
        $("#next_point").removeClass("hidden");
      }
      if ($currentIndex > 2 && $pageNumberSize < $pageCount) {
        $("#pre_point").removeClass("hidden");
      } else if ($currentIndex <= 2 && $pageNumberSize < $pageCount) {
        $("#pre_point").addClass("hidden");
      }
    });
    $("#next_point").on("click", function(event) {
      event.preventDefault();
      var prevIndex = $(this)
        .prevAll("a:not('.hidden')")
        .first()
        .index();
      var hideIndex = prevIndex - $pageNumberSize + 1;
      $("#paging a:eq(" + hideIndex + ")").addClass("hidden");
      $("#paging a").removeClass("aktif");
      $("#paging a:eq(" + (prevIndex + 1) + ")")
        .removeClass("hidden")
        .addClass("aktif");
      $currentIndex = prevIndex;
      var gt = $pageSize * $currentIndex;
      $thisAllTr.hide();
      for (var i = gt - $pageSize; i < gt; i++) {
        $thisAllTr.eq(i).show();
      }
      if ($currentIndex == $pageCount && $pageNumberSize < $pageCount) {
        $("#next_point").addClass("hidden");
      } else if ($currentIndex < $pageCount && $pageNumberSize < $pageCount) {
        $("#next_point").removeClass("hidden");
      }
      if ($currentIndex > $pageNumberSize && $pageNumberSize < $pageCount) {
        $("#pre_point").removeClass("hidden");
      } else if (
        $currentIndex < $pageNumberSize &&
        $pageNumberSize < $pageCount
      ) {
        $("#pre_point").addClass("hidden");
      }
    });
    $("#paging").on("click", "a:not('#pre_point,#next_point')", function() {
      var $index = $(this).index();
      console.log("$Index:" + $index);
      console.log(
        "currentindex:" +
          $currentIndex +
          " visible_page_count:" +
          $pageNumberSize +
          " pageCount:" +
          $pageCount
      );

      if ($(this).is("#paging a:first") === true) {
        if ($currentIndex === 1) {
          return false;
        }
        if ($currentIndex - 2 == $pageCount && $pageNumberSize < $pageCount) {
          $("#next_point").addClass("hidden");
        } else if (
          $currentIndex - 2 <= $pageCount - $pageNumberSize &&
          $pageNumberSize < $pageCount
        ) {
          $("#next_point").removeClass("hidden");
        }
        if ($currentIndex - 1 > 2 && $pageNumberSize < $pageCount) {
          $("#pre_point").removeClass("hidden");
        } else if ($currentIndex - 1 <= 2 && $pageNumberSize < $pageCount) {
          $("#pre_point").addClass("hidden");
        }
        $currentIndex = $currentIndex - 1;
        var gtFirst = $pageSize * $currentIndex;
        $("#paging a").removeClass("aktif");
        $("#paging a:not('#next_point'):eq(" + $currentIndex + ")").addClass(
          "aktif"
        );
        $("#paging a:not('#next_point'):eq(" + $currentIndex + ")").removeClass(
          "hidden"
        );
        if ($("#paging a.hidden").length >= 1) {
          $(
            "#paging a:not('#next_point,#paging a:last'):eq(" +
              ($currentIndex + $pageNumberSize) +
              ")"
          ).addClass("hidden");
        }
        $thisAllTr.hide();
        for (var f = gtFirst - $pageSize; f < gtFirst; f++) {
          $thisAllTr.eq(f).show();
        }

        return false;
      }
      if ($(this).is("#paging a:last") === true) {
        var $tmpCurrentIndex = $currentIndex;
        if ($pageNumberSize < $pageCount) {
          $tmpCurrentIndex--;
        }
        if ($tmpCurrentIndex === $pageCount) {
          return false;
        }
        if ($currentIndex == $pageCount && $pageNumberSize < $pageCount) {
          $("#next_point").addClass("hidden");
        } else if ($currentIndex < $pageCount && $pageNumberSize < $pageCount) {
          $("#next_point").removeClass("hidden");
        }
        if ($currentIndex > $pageNumberSize && $pageNumberSize < $pageCount) {
          $("#pre_point").removeClass("hidden");
        } else if (
          $currentIndex < $pageNumberSize &&
          $pageNumberSize < $pageCount
        ) {
          $("#pre_point").addClass("hidden");
        }
        var gtLast = $pageSize * $currentIndex;
        $currentIndex = $currentIndex + 1;

        $("#paging a").removeClass("aktif");
        $("#paging a:eq(" + $currentIndex + ")").addClass("aktif");
        $("#paging a:eq(" + $currentIndex + ")").removeClass("hidden");
        if (
          $currentIndex - 1 > $pageNumberSize &&
          $("#paging a.hidden").length >= 1
        ) {
          $(
            "#paging a:not('#next_point,#paging a:last'):eq(" +
              ($currentIndex - $pageNumberSize) +
              ")"
          ).addClass("hidden");
        }
        $thisAllTr.hide();
        for (var k = gtLast - $pageSize; k < gtLast; k++) {
          $thisAllTr.eq(k).show();
        }
        return false;
      }
      $currentIndex = $index;
      if ($pageNumberSize < $pageCount) {
        $currentIndex = $index - 1;
      }
      var gt = $pageSize * $currentIndex;
      $("#paging a").removeClass("aktif");
      $(this).addClass("aktif");
      $thisAllTr.hide();
      for (var i = gt - $pageSize; i < gt; i++) {
        $thisAllTr.eq(i).show();
      }
      console.log("CurrentIndexLast:" + $currentIndex);
    });
  };
})(jQuery);
