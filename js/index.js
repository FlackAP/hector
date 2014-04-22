// Generated by CoffeeScript 1.7.1
(function() {
  var entities, events, eyebrowsStates, eyelidsStates, fireEvent, frame, frameCount, gameCanvas, gameCq, getUrlSettings, hasMouseHit, loaded, loadedFrameCount, mouse, mouseDownHandler, mouseMoveHandler, mouseUpHandler, mouthStates, onEvent, pupilsStates, resizeFactor, root, setUrlSettings, sprites, touchDown, touchMove, touchTimeout,
    __slice = [].slice;

  hasMouseHit = function(x, y, width, height) {
    var col;
    col = {
      x: x + width / 2 >= mouse.x && x - width / 2 <= mouse.x,
      y: y + height / 2 >= mouse.y && y - height / 2 <= mouse.y
    };
    if (col.x && col.y) {
      return true;
    } else {
      return false;
    }
  };

  getUrlSettings = function() {
    var settings, url;
    url = root.document.URL;
    if (url.indexOf("#") + 1) {
      settings = url.substring(url.indexOf("#") + 1).split('');
      if (settings.length === 4) {
        return {
          eyebrows: eyebrowsStates[settings[0]] ? eyebrowsStates[settings[0]] : eyebrowsStates[0],
          eyelids: eyelidsStates[settings[1]] ? eyelidsStates[settings[1]] : eyelidsStates[0],
          mouth: mouthStates[settings[2]] ? mouthStates[settings[2]] : mouthStates[0],
          pupils: pupilsStates[settings[3]] ? pupilsStates[settings[3]] : pupilsStates[0]
        };
      }
    }
  };

  setUrlSettings = function() {
    var settings, url;
    url = root.document.URL;
    url = url.substring(0, url.indexOf("#"));
    settings = "#" + (eyebrowsStates.indexOf(face.s.eyebrows)) + (eyelidsStates.indexOf(face.s.eyelids)) + (mouthStates.indexOf(face.s.mouth)) + (pupilsStates.indexOf(face.s.pupils));
    return root.window.location.hash = settings;
  };

  root = this;

  frame = 0;

  resizeFactor = 2;

  touchDown = false;

  events = {};

  onEvent = function(eventName, eventHandler) {
    if (events[eventName] == null) {
      events[eventName] = [];
    }
    events[eventName].push(eventHandler);
    return function() {
      return events[eventName].splice(events[eventName].indexOf(eventHandler), 1);
    };
  };

  fireEvent = function() {
    var args, eventHandler, eventName, _i, _len, _ref, _ref1, _results;
    eventName = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if ((_ref = events[eventName]) != null ? _ref.length : void 0) {
      _ref1 = events[eventName];
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        eventHandler = _ref1[_i];
        _results.push(eventHandler.apply(null, args));
      }
      return _results;
    }
  };

  this.sprites = sprites = {
    "face": {
      "actions": {
        "skin": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAA6CAYAAADGFcvAAAABNklEQVRoQ+3aUQ6CMAwGYHcI7+WFfPJC3stDaEbSZQKja9fB36Q+A375qWO2pNvg5/N+fSWXuD+eSXI8Has6SYpbwzRYEXQU2EqyB94NnYUkPIdlobOBdcpH2EPomUgO3IRehWyVAiw0g+tS2IVeneZeGWygSMi6DHxCEdOkWi2JoiI3z3oXUHRkTnW59QHVbDwb50SihmEul0oe6jOg1rc9Eo1EZyRgfc1YnswTjU2JcaSxKTEONDbOpoHmjomLGi1Q9CXKJxQ1Vero/fWeEP+WuIAe9keRUnUBXQ8eYPujLBTl1+8CujdvgpyKuIC2pndQiboZMaqhZ64ALqbLHLL08Lnt+MzHag+yGzqrBHqRIqg1VoIUQ62wUqQKSvWsrVsNcggqTVcLpGDYl1+4FYEDjwLp+39qHtWc5f6nZgAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAzCAYAAAD7JnqGAAABJUlEQVRYR+3Z4Q0CIQwFYFnArZzJGZzJrVxAwyUQxAJtOcozqX/l9Mu7AkcvXCY+r+fjPbr8eruH0Rjqe/FFHAz1R1IgG6YF1UgukAU7C1UiR8AhbAUqAXu4JmwliJMcCbNC9ZL7gVmjWjgYWASWNfcF25UWlVqG7UbVOGwYSlplakdiDmM+ZsTZCZlY9Ae025hCdRizvPIwT8wTkyYgHe815olJE5COx90rER97jk0cEQb72JNhaKk5TLJUpEMv1IG3PI1Dwf6rRZDqYNfhpG7iQfTH6k5PXvnrWWOdGtXy3N7qpNJqJma5E7QaxN2u9epbqupaW8xSSNj0C4gV9TZCdYt/1RLCQYlgZyTHRYlhMzgJSgXT4KQoNaysv95apwGl3/4APZLBGq6++gkAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAuCAYAAAA/SqkPAAAA6UlEQVRYR+2Y4Q3EIAiF61rd6ibpVrdWL5poelYEioBJ7W/tx3u0BAgb8zm/x9m6EvZP4LyKfBgC1jBqACiYCuQG0AU/heYgeupBsBSKwZvgUdAe/AYeDYXgZuAYwDXnf2AttS3VBawNreG+YCu1V9VJ8WvA6Qv3UJzA1jaXPC8wp4uQnF05lrjHurusZtklOexXMj1qdWyBXBS/GGyZ59zi+jZ7root4HNNErn8abZCoGJNu+shfZ75WMPy1kpirlXESNXQAma+rY9UNbZoQxds3F8MA5bZido3UQoLFVrGVCocUs8BZtYPRA2vZuRC5CMAAAAASUVORK5CYII="]
        },
        "mouth": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAECAYAAABodtTSAAAAJklEQVQYV2M8VJrz3657CiMDmQCkH6yZXINg+qhnCMw1pPoIFgwAmXMap4CjQnIAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAACCAYAAACHSIaUAAAAH0lEQVQIW2M8VJrz3657CiMDiQCkD6wJxCBRLwPIQgATpgqlQ0dZqgAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAABCAYAAAA4u0VhAAAAEElEQVQIW2M8VJrzn4FCAACvSAKkaqtKXQAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAACCAYAAAC+LzfPAAAAIUlEQVQIW2NkAIJDpTn/QTQ5wK57CiMjyAAQgxwDYA4AAMg1CqWvauu0AAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAECAYAAABV5LW0AAAAK0lEQVQIW2NkgIJDpTn/YWxctF33FEaQHJgAaYAJ4NMIU8dIrAZkF5GlCQAGahlJD4Y4xQAAAABJRU5ErkJggg=="]
        },
        "ears": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAANCAYAAADWgVyvAAAAYklEQVRIS2N8sKL2PwMSUIhoZkTmDxY2ujsZ0QVADh1sjsfmRqwOH0yOx+ZokPtGHU6rvDAa4rQKWVzmjob4aIgTGQI4kwpI/2CuhHC5DVy9D/ZqH5v74O0SZMnBXOXD3AYA/OpeNv4mjFoAAAAASUVORK5CYII="]
        },
        "nose": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAPCAYAAADZCo4zAAAAcUlEQVQYV2NkQAKvNzT/B3FFA2oZYcJwBkiAaAXIpmCYcP3oSwZNa3G4NXAFMOPxKgBJggBOE3AqQDYeZgLMoWA3UKYAXTcsBGEOZcSnAKQYrADmeuR4gTkWHlCHSnPAEQUDdt1TwHIoQQ1TBJMEKQAAc3FYStOrSO4AAAAASUVORK5CYII="]
        },
        "eye_whites": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAFCAYAAACuNHcwAAAAK0lEQVQYV2NkAIKnT+/9B9EwIC2txIjMJ4aNzQxGdEFyLMBlxhA2nJZhDgCkOCb7SrxlvQAAAABJRU5ErkJggg=="]
        },
        "pupils": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAABCAYAAADTjP5iAAAAFklEQVQIW2M0MzP7f+rUKUYGCgDIDAAUCgWjuVjQ7AAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAECAYAAABhnXSoAAAAKklEQVQYV2NkAAIzM7P/IPrUqVOMIJocgGwGI4wDM4gcg9HNoI2htPA+AIo1G0cHpildAAAAAElFTkSuQmCC"]
        },
        "eyebrows": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAACCAYAAACpDacGAAAAKElEQVQIW2NkQAKhrpb/kfmrdx9nROYTw0Y2A10/I7oF6AaSYiEhswCsPw3VDopBvwAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAICAYAAAAIloRgAAAAWUlEQVQoU2NkIABCXS3/r959nJGQOmLkcRoCsgRkALEWEeMoDMtglpBiEcxXhByIYhkhxcQEFT7Hgi2jxDe4HIDN4YzU8A2xFlIlleELXmTP0NwyWDSBUjUAx2E0CURot4sAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAHCAYAAADj/NY7AAAASklEQVQoU2MMdbX8zwAEq3cfZwTR1AAwM8EGUtMCZLPgroUJUuILdEdiBAU5vsDlMKzhTIoF+NTijESQJkKRTMgReFMIPguIsRwACzU12k7DDSsAAAAASUVORK5CYII="]
        },
        "eyelids": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAHCAYAAAD9NeaIAAAAOUlEQVQoU2NkgILXG5r/w9ggWjSglhGZTwwblxlgg9AlYQaSYhE+MxhxSZJiESEzhpEldIkTeqQuAFv0NV9Bp5PrAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAHCAYAAADnCQYGAAAAKklEQVQoU2N8vaH5PwMSEA2oZUTmE8NGN4NkA4ixZNRQYkKJNDWMtIh9AAo+DkJjIYPbAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAHCAYAAADj/NY7AAAANUlEQVQoU2NkAILXG5r/g2gYEA2oZUTmE8PGZgYjuiA5FuAyg2QXEuMLmJohbDjNw5xWqQUARPAeQlFRGIkAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAHCAYAAAD9NeaIAAAARUlEQVQoU2NkgILXG5r/w9ggWjSglhGZTwwblxkkG0SMZehqhpEl6OGI7lVi4oaQGeDgwqWIGAtwJRyYOMgMeJzQMnUBAJnsHyXwfP54AAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAHCAYAAAD9NeaIAAAAPklEQVQoU2NkgILXG5r/w9ggWjSglhGZTwwblxlgg9AlYQaSYhE+MxhxSZJiESEzSA4SYoINXc0wtISWqQsA19wfJbZ8PhMAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAHCAYAAAD9NeaIAAAAQUlEQVQoU2NkgILXG5r/w9ggWjSglhGZTwwblxlgg9AlYQaSYhE+MxhxSZJiESEzSA4SYoINXQ39fELzOKFH6gIAI34uQka/i+sAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAHCAYAAAD9NeaIAAAAQUlEQVQoU2NkgILXG5r/w9ggWjSglhGZTwwblxlgg9AlYQaSYhE+M0h2LTE+QlfDiMsFpPiGkBn0sYSucULL1AUAVOAuQlDkeFQAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAHCAYAAAD9NeaIAAAAQElEQVQoU2NkgILXG5r/w9ggWjSglhGZTwwblxkkG0SMZehqwJaguwCmiBTf4DODEZckKRYRMoM+ltAluOiRugAssy5Csr2zKgAAAABJRU5ErkJggg==", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAHCAYAAAD9NeaIAAAAPklEQVQoU2NkgILXG5r/w9ggWjSglhGZTwwblxlgg9AlYQaSYhE+MxhxSZJiESEz6GMJMWFNqRr6xAk9UhcA8g0uQjqOE4QAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAHCAYAAAD9NeaIAAAAQUlEQVQoU2NkgILXG5r/w9ggWjSglhGZTwwblxlgg9AlYQaSYhE+MxhxSZJiESEz6GMJXYKLmAilVA08BdEydQEAGkkuQv+5iYsAAAAASUVORK5CYII="]
        },
        "backboard": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAABYCAYAAABf0BGmAAAEUUlEQVR4Xu2cS5LUMAyG0z2wYXgv4CIcgFtwRjacgQVLqjgHbHgVbIBqSt1lUNSyJdmy4ySezdRMO7b8+f8l59E5TB3+vHr54vT67ftDh6FNXQUFoDCkJaCFGGJjdwGMgqLKagVOs2AsMHxg7WAlWC0Ul4qBzl8EBgF7Q0sF+OT23pnR5x8/xRTmEZdmwfA4V8AstMUZoQZSYAEU7VMDzrqo0oJxYwZo/4BJE8rJK5o+Y6C4xdDCsywkbotjiUGLArNYIydAC6gW8Lh4OGhnYFQJ2oNzQMExpbC8AGrioNCugEmd5NpC6jcXfs3jPn39Pt29czMb4oDVtcZJ1QLGwYLEPwP26/ef6dmjB7ViWFW/FNisSmKVDWiXdcXA2H3YgPbfADF1QYvZxnVAS6vrChjdYuzRnil1scAwtAHs+jxaPPneEzRJXaLCoMEANt8NRS8g7rEAxLYSGNkAhmgUAdtbxdTkr2gOC9D3ZMsBzHjm6g5syxUzdmWCY568zUYvLG51i6FVlymHBdpbvGY2gBnyl8WOQ2HkulfgnLrfacph0OHWLJm6B1mU9E+n0/T0/q1B7OtpSqG5KWxr6gpLOoAZxW2xpSmH1VTYxy/fktN8/vihEYOtuVZlqqsVtZK9BCk25RrwugeWCytA9IbWLbBSUFR1XuBcgXnlLm9Y3mrTQBNvgnjlr1qwPKF1A6w2LC9oLsBK7dgKlge0Acy2FTu3xtC4UyQxh5UorLW6WqhsACMqlGwpPnaeq7Cl1OWtMvGLDV6PcA5ghgS6NKxSlaVsmbTkWu1YCixVLQewiHNi2wt3YL3YsVRlA5ghB2dbMudO9+4UBnTD1mIAu8gy+X3JAewCSZ3DBrDrbwOrFQbwrLbcQg4zbVyxwgawBs/pb01h4sl32K7kVsq1A5OeFVPdyLXksbUDM18Powpbcx6z3rOU1AUs3BUGnfaiMiswSV1JYCXVco3ANOqqBqwHlVnUZXnOVXy7U+63QZZWmRYYBwuK3Jt3H1g2JmDWArAUNC0smA8FloIlWpKrmPA/7aXr3oFZYWUD63lfplVXDiw1MFoxLdZsrTINsFxYRcB6hFYblgkYp7KeoGlg5ST5kMfDb7FK0gO4l6hpc1ote7aCZVZYrGouqbSWsLKBldrT40xAC8rDhthlZkvig0vsWQJtKVhFCvOwJ4Yv5TcLpKAq+I3fMCft4mm+5v4uUpg3NE3AmjbW80NNn9lVMtZ5qT0tQafacptSaB87mbaO66IwSWnwee1XBQKoGhakQF2Bxaon/F+7V7OuOAcqjOelKhyTOzAJmqfaYrnK04LVFZayZ/gM1FYCDkAdj4fp5niczcejCkoKr6IwPGjqfdRWm8bsB+N5vPlcggWfVweWsqglt3H2CxNsBasZMMmmKYumVNVSWWEOTRRGpR6zaQCH29N3QS+hqupVUpMLNO/a5/ppaT9u/EUUpi0KuN3SoEIsfwGxSNLkHDhTaAAAAABJRU5ErkJggg=="]
        }
      }
    },
    "hand": {
      "actions": {
        "point": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAASCAYAAABvqT8MAAAAaUlEQVQoU+2TyxIAIARF8/8f3YMY1WVhXauGOZUj1PDqM0wohYJ9rkbEqSf/ga2RLbEiMXXYCi35HnhQATlSvNsNd+MWaIB/hu4zYOXCk60Qd0MJSCEtvGzprk+tHXbh9w3mw8JwSDJoAFWEPg4dD6xrAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAASCAYAAABvqT8MAAAAZ0lEQVQoU8WS4Q7AMASEef+HViwa265rNU3mJz7OBVMxuNhPxwDRzXAYSooGMXvpVf8RcD2XrJu0oaRsdwYDMFdikh+NwsAORJMlVwAbOJzcD0kbtoBPKA7fdulpCrIJ/8rs3cvv3QACsDIOknFsbwAAAABJRU5ErkJggg=="]
        }
      }
    },
    "buttons": {
      "actions": {
        "eyebrows": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAZUlEQVQYV2NkAALHdSf+g2h8YH+QBSMjMQphhpCveKe/OQPr/98MTpvOMezzM2L4zcjK4L7xJNx1cJNBkiBF6ABZnHxnEAoR0kzW7V70X0RZjZChDG/u3mJgBKkCaSCk+nJpHCMAYEMvXoqcnNkAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAVklEQVQYV2NkAIKKo9f/g2h8oMNak5GRGIUwQ8hX3G6hAjak8sQdBmQ2hskgSZAidIAsTr4zCIUIaSZnrNn9X0BShpChDB+eP2FgBKkCaSCkekaIKyMA1cIvXpeRVh4AAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAQUlEQVQYV2NkIAEwgtQ2nrz1n5CeenM1RkZiFMIMIl9xnYkS2JCmM/cYkNkYJoMkQYrQAbI4+c4gFCKkmUxKOAMAHUsqAG/DvwMAAAAASUVORK5CYII="]
        },
        "eyelids": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAXUlEQVQYV2NkAALf01H/QTQ+sNl0GSMjMQphhmAo3qS/BG6B38UYFMtQFIMUIitA58MVI0vgYpNnMsxxRLuZUPAxmi5x/i+hLk5IHcOLmy8ZGEGqQBoIqT4ds5cRADZIOT1S6TirAAAAAElFTkSuQmCC", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAXElEQVQYV2NkAILGm63/QTQ+UK9ezchIjEKYIRiK65Qq4RY03WtHsQxFMUghsgJ0PlwxsgQuNnkmwxxHtJsJBR9j/t7i/0IyQoTUMbx78o6BEaQKpIGQ6onOvYwAi0I8u122RX8AAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAARklEQVQYV2NkIAEwgtR23un5T0hPuUoJIyMxCmEGYSguUyiGW9L1oBfFQhTFIIXICtD5cMXIErjY5JkMcxzRbiYUfCSFMwCLzTeb6+UA+gAAAABJRU5ErkJggg=="]
        },
        "mouth": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAUElEQVQYV2NkAIJHM5z/g2h8QC5jLyMjMQphhtBYsUTyHoYXc11wOhkmD3cGSAAXgBlEQzfvqDL4ryUnTCiYGa49esvACFIF0kBItUfbBUYArx4pkLUp7+sAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAUElEQVQYV2NkAIJXW4v/g2h8QMy7l5GRGIUwQ2isWNC9h+H9zhKcTobJw50BEsAFYAbR0M1n5qf+lxPjIxTMDI9efWJgBKkCaSCk2iRxNiMATwIsUczxorMAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAOklEQVQYV2NkIAEwgtS+3lXzn5AeUbcWRkZiFMIMorFiQedmhvd7a3E6GyYPdwZIABeAGURDN5MSzgAXwCbrz/IpnAAAAABJRU5ErkJggg=="]
        },
        "pupils": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAVklEQVQYV2NkAIKzsV7/QTQ+YLx4GyMjMQphhlCuWHfBVriLLid4w9koJoMUgSSJUgwzgiTFuEKFNA8uczX9ry4hSiiYGW6+eM3ACFIF0kBIddTu04wA07oqT0GgdvYAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAVklEQVQYV2NkAILbXTX/QTQ+oFrWwshIjEKYIZQrVihphrvoQU8tnI1iMkgRSJIoxTAjSFKMK1RI8+C+ypz/soIChIKZ4fH7DwyMIFUgDYRUO7VPYQQALJctzZGvn44AAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAQElEQVQYV2NkIAEwgtTem9z6n5AepdxqRkZiFMIMolyxXHYV3FWPprbB2SgmgxSBJIlSDDOCJMW4QoY0D5ISzgDfJii+hjaIIQAAAABJRU5ErkJggg=="]
        },
        "github": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAoUlEQVQ4T7WTUQ7AIAhD9eYefdFEA0gLZNu+tqGPQqE3/gwQRv9br14w5y+wBcLM2UokUML2O0tgz6zvCBgIW2EF3kCrpFK6quwX4Bt1uyWHMRUy4Ix5cXgnAmZMkcYslz0DKqZ8DlTJkUKVldR9VeKNDTLCct1WsTlUG2BoqMcDrV5UMjSSAa+hFSpTQKQqM1ZqUzwTJYQBoctoMjzH6fY89gMmFeRHadgAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAApUlEQVQ4T62U2w6AMAhD3f9/tGZLWADbgpm+ObZDuY5LfzcxD/aMGRgoc17v80EXRMEe6GF2rhzkO+u/AhYpXmZzGoBZCU068BAiY6EdAU/UmeDNmEoUcNpQJ9DuqICdovjCLO+oNb7k8HdgEMQU5h5lob+iQ23TzStMlerDMAFJIt1CbPSqkGkhFdBEoYq3gKH8LsQOcN/pLFgFLBdsbg80enJ6HjOFKQ/l9ytHAAAAAElFTkSuQmCC"]
        },
        "twitter": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAXElEQVQoU2NkAIJP336UgmgQ4OPi6IaxsdGMIMVO537B5fYZseHVNEAasLkd5jcMJ+HyMMxvA6ABZDVJfhhC8QBLZ0QHK0gDyH+MsNSKnADxRR5YA3oSx6UBlDwA4+Jou2bk0eoAAAAASUVORK5CYII=", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAY0lEQVQoU2NkAIJPP37+B9EgwMfBzghjY6MZQYqdz/6Gy+01ZsWraYA0YHM7zG8YTsLlYZjfBkADyGpsEcELjZ8BClZ8yQOrk3AFLcggooMVZMg+WICgJ0BcNsA1oCdxfE4CAE+6adfQxgaIAAAAAElFTkSuQmCC"]
        }
      }
    },
    "scenery": {
      "actions": {
        "wallpaper": {
          "frames": ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAjElEQVQ4T8XVUQ6AIAwDUHtuvz33DCQjqGN2CMh382wImxCRYyMOgJ3NJg5MOKH6bSZPwTUawd3GFsriTdhDGdyEGfQNf8AR1MMvcA/awgv8BbXwDI9A7ziIoQtHctlpjXVER1xHPe7zX4VeZE9zazGtm7xIc2+Frt9uXnNm2f/3B6mbM01LPhKOzPYJV1udQ5ZTsREAAAAASUVORK5CYII="]
        }
      }
    }
  };

  eyebrowsStates = ['flat', 'peak', 'valley'];

  eyelidsStates = ['closed', 'squint', 'half', 'open'];

  mouthStates = ['flat', 'happy', 'joyful', 'sad', 'sorrowful'];

  pupilsStates = ['small', 'large'];

  loaded = false;

  frameCount = 0;

  loadedFrameCount = 0;

  this.e = entities = [];

  root.onload = function() {
    var frameIndex, group, groupName, sprite, spriteName, _results;
    _results = [];
    for (spriteName in sprites) {
      sprite = sprites[spriteName];
      _results.push((function() {
        var _ref, _results1;
        _ref = sprite.actions;
        _results1 = [];
        for (groupName in _ref) {
          group = _ref[groupName];
          _results1.push((function() {
            var _ref1, _results2;
            _ref1 = group.frames;
            _results2 = [];
            for (frameIndex in _ref1) {
              frame = _ref1[frameIndex];
              _results2.push((function(spriteName, sprite, groupName, group, frameIndex, frame) {
                var img;
                frameCount++;
                img = document.createElement('img');
                img.onload = function() {
                  group.frames[frameIndex] = img;
                  loadedFrameCount++;
                  if (frameCount === loadedFrameCount) {
                    loaded = true;
                    console.log('loaded', sprites);
                    return fireEvent('assetsLoaded');
                  }
                };
                return img.src = frame;
              })(spriteName, sprite, groupName, group, frameIndex, frame));
            }
            return _results2;
          })());
        }
        return _results1;
      })());
    }
    return _results;
  };

  onEvent('assetsLoaded', function() {
    var img, wallpaper, wallpaperPattern, wallpaperSource;
    img = sprites.scenery.actions.wallpaper.frames[0];
    wallpaperPattern = cq().context.createPattern(img, 'repeat');
    wallpaperSource = cq(1000, 1000);
    wallpaperSource.rect(0, 0, wallpaperSource.canvas.width, wallpaperSource.canvas.height).fillStyle(wallpaperPattern).fill();
    return entities.push(this.wallpaper = wallpaper = {
      tile: cq(),
      draw: function(ctx) {
        var sourceHeight, sourceWidth, sourceX, sourceY;
        sourceWidth = gameCanvas.width / resizeFactor;
        sourceX = wallpaperSource.canvas.width / 2 - sourceWidth / 2;
        sourceHeight = gameCanvas.height / resizeFactor;
        sourceY = wallpaperSource.canvas.height / 2 - sourceHeight / 2;
        return ctx.drawImage(wallpaperSource.canvas, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, gameCanvas.width, gameCanvas.height);
      }
    });
  });

  onEvent('assetsLoaded', (function(_this) {
    return function() {
      var face;
      return entities.push(_this.face = face = {
        x: 0,
        y: 0,
        yOffset: -20,
        focal: {
          x: gameCanvas.width / 2,
          y: gameCanvas.height / 2
        },
        headSpeed: 4,
        a: {
          backboard: sprites.face.actions.backboard.frames,
          skin: sprites.face.actions.skin.frames,
          mouth: sprites.face.actions.mouth.frames,
          ears: sprites.face.actions.ears.frames,
          nose: sprites.face.actions.nose.frames,
          eye_whites: sprites.face.actions.eye_whites.frames,
          pupils: sprites.face.actions.pupils.frames,
          eyebrows: sprites.face.actions.eyebrows.frames,
          eyelids: sprites.face.actions.eyelids.frames
        },
        s: getUrlSettings() || {
          eyelids: 'open',
          eyebrows: 'flat',
          mouth: 'flat',
          pupils: 'small'
        },
        f: {
          eyebrows: 0,
          pupils: 0,
          mouth: 2,
          eyelids: 0
        },
        b: {
          blinking: true,
          duration: 5,
          interval: 1,
          frame: 0,
          startNew: function() {
            var blinkTime;
            blinkTime = 3000 + (Number((Math.random()).toFixed(1))) * 10000;
            this.duration = 1 + (Number((Math.random()).toFixed(1))) * 5;
            if ((Number((Math.random()).toFixed(1))) < 0.7) {
              this.interval = 0;
            } else {
              this.interval = (Number((Math.random()).toFixed(1))) * 5;
            }
            return setTimeout((function(_this) {
              return function() {
                return _this.blinking = true;
              };
            })(this), blinkTime);
          }
        },
        update: function() {
          if (!this.headSpeed) {
            this.headSpeed = 1;
          }
          this.focal.x += (mouse.x - this.focal.x) / this.headSpeed;
          this.focal.y += (mouse.y - this.focal.y) / (this.headSpeed * 1.6);
          this.x = gameCanvas.width / 2;
          return this.y = gameCanvas.height / 2 + (this.yOffset * resizeFactor);
        },
        draw: function(ctx) {
          var earPax, eyeOffset, eyeballPax, eyebrowOffset, middleSkinPax, mouthOffset, noseOffset, nosePax, pax, pupilPax, topSkinPax;
          pax = {
            x: (this.focal.x - gameCanvas.width / 2) / gameCanvas.width / 2,
            y: (this.focal.y - (this.yOffset * resizeFactor) - (gameCanvas.height / 2)) / gameCanvas.height / 2
          };
          eyebrowOffset = -10 * resizeFactor;
          eyeOffset = -4 * resizeFactor;
          noseOffset = 5 * resizeFactor;
          mouthOffset = 15 * resizeFactor;
          earPax = -4;
          middleSkinPax = 5;
          topSkinPax = 8;
          eyeballPax = 10;
          nosePax = 15;
          pupilPax = 17;
          if (this.a.eyebrows[this.f.eyebrows] == null) {
            this.f.eyebrows = 0;
          }
          if (this.a.pupils[this.f.pupils] == null) {
            this.f.pupils = 0;
          }
          if (this.a.mouth[this.f.mouth] == null) {
            this.f.mouth = 0;
          }
          if (this.a.eyelids[this.f.eyelids] == null) {
            this.f.eyelids = 0;
          }
          if (this.s.eyelids === 'open') {
            this.f.eyelids = 1;
          } else if (this.s.eyelids === 'closed') {
            this.f.eyelids = 0;
          } else if (this.s.eyelids === 'squint') {
            this.f.eyelids = 5;
            if (pax.y < -0.05) {
              this.f.eyelids = 6;
              if (pax.y < -0.2) {
                this.f.eyelids = 7;
              }
            }
            if (pax.y > 0.05) {
              this.f.eyelids = 8;
            }
          } else if (this.s.eyelids === 'half') {
            this.f.eyelids = 2;
            if (pax.y < -0.07) {
              this.f.eyelids = 3;
            }
            if (pax.y > 0.07) {
              this.f.eyelids = 4;
            }
          }
          if (this.s.pupils === 'small') {
            this.f.pupils = 0;
          } else if (this.s.pupils === 'large') {
            this.f.pupils = 1;
          }
          if (this.s.eyebrows === 'flat') {
            this.f.eyebrows = 0;
          } else if (this.s.eyebrows === 'peak') {
            this.f.eyebrows = 1;
          } else if (this.s.eyebrows === 'valley') {
            this.f.eyebrows = 2;
          }
          if (this.s.mouth === 'joyful') {
            this.f.mouth = 0;
          } else if (this.s.mouth === 'happy') {
            this.f.mouth = 1;
          } else if (this.s.mouth === 'flat') {
            this.f.mouth = 2;
          } else if (this.s.mouth === 'sad') {
            this.f.mouth = 3;
          } else if (this.s.mouth === 'sorrowful') {
            this.f.mouth = 4;
          }
          if (this.f.pupils === 1) {
            pupilPax = 13;
          }
          if (this.b.blinking) {
            this.b.frame++;
            if (this.b.frame > this.b.duration * (this.b.interval ? 2 : 1) + this.b.interval) {
              this.b.blinking = false;
              this.b.frame = 0;
              this.b.startNew();
            } else if (this.b.frame > this.b.duration + this.b.interval && this.b.interval) {
              this.f.eyelids = 0;
            } else if (this.b.frame > this.b.duration) {
              false;
            } else {
              this.f.eyelids = 0;
            }
          }
          return ctx.save().translate(this.x - this.a.backboard[0].width * resizeFactor / 2, this.y - this.a.backboard[0].height * resizeFactor / 2).drawImage(this.a.backboard[0], 0, 0, this.a.backboard[0].width, this.a.backboard[0].height, 0, 0, this.a.backboard[0].width * resizeFactor, this.a.backboard[0].height * resizeFactor).restore().save().translate((this.x - this.a.ears[0].width * resizeFactor / 2) + earPax * resizeFactor * pax.x, (this.y - this.a.ears[0].height * resizeFactor / 2) + earPax * resizeFactor * pax.y).drawImage(this.a.ears[0], 0, 0, this.a.ears[0].width, this.a.ears[0].height, 0, 0, this.a.ears[0].width * resizeFactor, this.a.ears[0].height * resizeFactor).restore().save().translate(this.x - this.a.skin[0].width * resizeFactor / 2, this.y - this.a.skin[0].height * resizeFactor / 2).drawImage(this.a.skin[0], 0, 0, this.a.skin[0].width, this.a.skin[0].height, 0, 0, this.a.skin[0].width * resizeFactor, this.a.skin[0].height * resizeFactor).restore().save().translate((this.x - this.a.skin[1].width * resizeFactor / 2) + middleSkinPax * resizeFactor * pax.x, (this.y - this.a.skin[1].height * resizeFactor / 2) + middleSkinPax * resizeFactor * pax.y).drawImage(this.a.skin[1], 0, 0, this.a.skin[1].width, this.a.skin[1].height, 0, 0, this.a.skin[1].width * resizeFactor, this.a.skin[1].height * resizeFactor).restore().save().translate((this.x - this.a.skin[2].width * resizeFactor / 2) + topSkinPax * resizeFactor * pax.x, (this.y - this.a.skin[2].height * resizeFactor / 2) + topSkinPax * resizeFactor * pax.y).drawImage(this.a.skin[2], 0, 0, this.a.skin[2].width, this.a.skin[2].height, 0, 0, this.a.skin[2].width * resizeFactor, this.a.skin[2].height * resizeFactor).restore().save().translate((this.x - this.a.eye_whites[0].width * resizeFactor / 2) + eyeballPax * resizeFactor * pax.x, (this.y - this.a.eye_whites[0].height * resizeFactor / 2 + eyeOffset) + eyeballPax * resizeFactor * pax.y).drawImage(this.a.eye_whites[0], 0, 0, this.a.eye_whites[0].width, this.a.eye_whites[0].height, 0, 0, this.a.eye_whites[0].width * resizeFactor, this.a.eye_whites[0].height * resizeFactor).restore().save().translate((this.x - this.a.pupils[this.f.pupils].width * resizeFactor / 2) + pupilPax * resizeFactor * pax.x, (this.y - this.a.pupils[this.f.pupils].height * resizeFactor / 2 + eyeOffset) + pupilPax * resizeFactor * pax.y).drawImage(this.a.pupils[this.f.pupils], 0, 0, this.a.pupils[this.f.pupils].width, this.a.pupils[this.f.pupils].height, 0, 0, this.a.pupils[this.f.pupils].width * resizeFactor, this.a.pupils[this.f.pupils].height * resizeFactor).restore().save().translate((this.x - this.a.eyelids[this.f.eyelids].width * resizeFactor / 2) + eyeballPax * resizeFactor * pax.x, (this.y - this.a.eyelids[this.f.eyelids].height * resizeFactor / 2 + eyeOffset) + eyeballPax * resizeFactor * pax.y).drawImage(this.a.eyelids[this.f.eyelids], 0, 0, this.a.eyelids[this.f.eyelids].width, this.a.eyelids[this.f.eyelids].height, 0, 0, this.a.eyelids[this.f.eyelids].width * resizeFactor, this.a.eyelids[this.f.eyelids].height * resizeFactor).restore().save().translate((this.x - this.a.mouth[this.f.mouth].width * resizeFactor / 2) + topSkinPax * resizeFactor * pax.x, (this.y - this.a.mouth[this.f.mouth].height * resizeFactor / 2 + mouthOffset) + topSkinPax * resizeFactor * pax.y).drawImage(this.a.mouth[this.f.mouth], 0, 0, this.a.mouth[this.f.mouth].width, this.a.mouth[this.f.mouth].height, 0, 0, this.a.mouth[this.f.mouth].width * resizeFactor, this.a.mouth[this.f.mouth].height * resizeFactor).restore().save().translate((this.x - this.a.nose[0].width * resizeFactor / 2) + nosePax * resizeFactor * pax.x, (this.y - this.a.nose[0].height * resizeFactor / 2 + noseOffset) + nosePax * resizeFactor * pax.y).drawImage(this.a.nose[0], 0, 0, this.a.nose[0].width, this.a.nose[0].height, 0, 0, this.a.nose[0].width * resizeFactor, this.a.nose[0].height * resizeFactor).restore().save().translate((this.x - this.a.eyebrows[this.f.eyebrows].width * resizeFactor / 2) + topSkinPax * resizeFactor * pax.x, (this.y - this.a.eyebrows[this.f.eyebrows].height * resizeFactor / 2 + eyebrowOffset) + topSkinPax * resizeFactor * pax.y).drawImage(this.a.eyebrows[this.f.eyebrows], 0, 0, this.a.eyebrows[this.f.eyebrows].width, this.a.eyebrows[this.f.eyebrows].height, 0, 0, this.a.eyebrows[this.f.eyebrows].width * resizeFactor, this.a.eyebrows[this.f.eyebrows].height * resizeFactor).restore();
        }
      });
    };
  })(this));

  onEvent('assetsLoaded', function() {
    var btnGap, btnNames, btns, i, name, _results;
    btns = {};
    this.btns = {};
    btnGap = 20;
    btnNames = ['eyebrows', 'eyelids', 'mouth', 'pupils'];
    _results = [];
    for (i in btnNames) {
      name = btnNames[i];
      _results.push((function(i, name) {
        return entities.push(this.btns[name] = btns[name] = {
          x: 0,
          y: 0,
          a: sprites.buttons.actions[name].frames,
          f: 0,
          s: 'up',
          yOffset: 40,
          mouseOver: false,
          update: function() {
            this.x = gameCanvas.width / 2 + (btnGap * resizeFactor * i) - (btnGap * resizeFactor * ((btnNames.length - 1) / 2));
            this.y = gameCanvas.height / 2 + (this.yOffset * resizeFactor);
            return this.mouseOver = hasMouseHit(this.x, this.y, this.a[this.f].width * resizeFactor, this.a[this.f].height * resizeFactor);
          },
          draw: function(ctx) {
            var index, states;
            this.s = 'up';
            if (this.mouseOver) {
              if (mouse.down) {
                this.s = 'down';
              } else {
                this.s = 'hover';
              }
              if (mouse.up) {
                if (name === 'pupils') {
                  states = pupilsStates;
                  index = states.indexOf(face.s.pupils) + 1;
                  if (index >= states.length) {
                    index = 0;
                  }
                  face.s.pupils = states[index];
                } else if (name === 'eyebrows') {
                  states = eyebrowsStates;
                  index = states.indexOf(face.s.eyebrows) + 1;
                  if (index >= states.length) {
                    index = 0;
                  }
                  face.s.eyebrows = states[index];
                } else if (name === 'eyelids') {
                  states = eyelidsStates;
                  index = states.indexOf(face.s.eyelids) + 1;
                  if (index >= states.length) {
                    index = 0;
                  }
                  face.s.eyelids = states[index];
                } else if (name === 'mouth') {
                  states = mouthStates;
                  index = states.indexOf(face.s.mouth) + 1;
                  if (index >= states.length) {
                    index = 0;
                  }
                  face.s.mouth = states[index];
                }
                setUrlSettings();
              }
            }
            if (this.s === 'down') {
              this.f = 2;
            } else if (this.s === 'hover') {
              this.f = 1;
            } else {
              this.f = 0;
            }
            return ctx.save().translate(this.x - this.a[this.f].width * resizeFactor / 2, this.y - this.a[this.f].height * resizeFactor / 2).drawImage(this.a[this.f], 0, 0, this.a[this.f].width, this.a[this.f].height, 0, 0, this.a[this.f].width * resizeFactor, this.a[this.f].height * resizeFactor).restore();
          }
        });
      })(i, name));
    }
    return _results;
  });

  onEvent('assetsLoaded', function() {
    var href, linkBtns, name, _results;
    linkBtns = {
      github: 'http://github.com/wilfredjamesgodfrey/hector',
      twitter: 'http://twitter.com/wjagodfrey'
    };
    _results = [];
    for (name in linkBtns) {
      href = linkBtns[name];
      _results.push((function(name, href) {
        return entities.push(this.btns[name] = btns[name] = {
          a: sprites.buttons.actions[name].frames,
          f: 0,
          s: 'off',
          update: function() {
            this.x = gameCanvas.width - (this.a[this.f].width * 2) / 2;
            this.y = this.a[this.f].height * 2;
            if (name === 'twitter') {
              this.x -= 28;
              this.y -= 5;
            } else if (name === 'github') {
              this.x -= 20;
              this.y += 35;
            }
            return this.mouseOver = hasMouseHit(this.x, this.y, this.a[this.f].width * 2, this.a[this.f].height * 2);
          },
          draw: function(ctx) {
            this.s = 'off';
            if (this.mouseOver) {
              this.s = 'hover';
              if (mouse.up) {
                document.location.href = href;
              }
            }
            if (this.s === 'hover') {
              this.f = 1;
            } else {
              this.f = 0;
            }
            return ctx.save().translate(this.x - this.a[this.f].width * 2 / 2, this.y - this.a[this.f].height * 2 / 2).drawImage(this.a[this.f], 0, 0, this.a[this.f].width, this.a[this.f].height, 0, 0, this.a[this.f].width * 2, this.a[this.f].height * 2).restore();
          }
        });
      })(name, href));
    }
    return _results;
  });

  onEvent('assetsLoaded', function() {
    var hand;
    onEvent('onmousedown', function() {
      return hand.f.point = 1;
    });
    onEvent('onmouseup', function() {
      return hand.f.point = 0;
    });
    return entities.push(this.hand = hand = {
      x: gameCanvas.width / 2,
      y: gameCanvas.height / 2,
      a: {
        point: sprites.hand.actions.point.frames
      },
      f: {
        point: 0
      },
      s: 'open',
      draw: function(ctx) {
        ctx.save();
        ctx.context.globalAlpha = 0.8;
        return ctx.translate(mouse.x - this.a.point[this.f.point].width * (resizeFactor / 2) / 2, mouse.y).drawImage(this.a.point[this.f.point], 0, 0, this.a.point[this.f.point].width, this.a.point[this.f.point].height, 0, 0, this.a.point[this.f.point].width * (resizeFactor / 1.4), this.a.point[this.f.point].height * (resizeFactor / 1.4)).restore();
      }
    });
  });

  touchMove = false;

  touchTimeout = {};

  this.mouse = mouse = {
    x: 0,
    y: 0,
    down: false,
    up: false
  };

  gameCq = cq().framework({
    onresize: function(width, height) {
      if (mouse.x > width) {
        mouse.x = width;
      }
      if (mouse.y > height) {
        mouse.y = height;
      }
      this.canvas.width = width;
      this.canvas.height = height;
    },
    onmouseup: mouseUpHandler = function(x, y, btn) {
      mouse.down = false;
      mouse.up = true;
      return fireEvent('onmouseup', x, y, btn);
    },
    onmousedown: mouseDownHandler = function(x, y, btn) {
      touchDown = true;
      mouse.down = true;
      return fireEvent('onmousedown', x, y, btn);
    },
    onmousemove: mouseMoveHandler = function(x, y) {
      return mouse = {
        x: x,
        y: y
      };
    },
    ontouchstart: function(x, y, touch) {
      if (touch.length === 1) {
        touchDown = true;
        return mouseMoveHandler(x, y);
      }
    },
    ontouchmove: function(x, y, touch) {
      touchMove = true;
      return mouseMoveHandler(x, y);
    },
    ontouchend: function(x, y, touch) {
      touchDown = false;
      if (!touchMove) {
        mouseDownHandler(x, y);
        clearTimeout(touchTimeout);
        touchTimeout = setTimeout(function() {
          return mouseUpHandler(x, y);
        }, 100);
      }
      return touchMove = false;
    },
    onrender: function(delta, time) {
      var entity, i;
      if (loaded) {
        frame++;
      }
      this.clear('#c6d191');
      this.context.mozImageSmoothingEnabled = this.context.webkitImageSmoothingEnabled = this.context.msImageSmoothingEnabled = this.context.imageSmoothingEnabled = false;
      resizeFactor = Math.min(gameCanvas.width / 130, gameCanvas.height / 100);
      if (resizeFactor < 2) {
        resizeFactor = 2;
      }
      for (i in entities) {
        entity = entities[i];
        if (typeof entity.update === "function") {
          entity.update();
        }
        if (typeof entity.draw === "function") {
          entity.draw(this, delta, time, parseInt(i));
        }
      }
      mouse.up = false;
    }
  });

  gameCanvas = gameCq.canvas;

  onEvent('assetsLoaded', function() {
    console.log(root.innerWidth);
    this.mouse = mouse = {
      x: root.innerWidth / 2,
      y: root.innerHeight / 2,
      down: false,
      up: false
    };
    gameCanvas.width = root.innerWidth;
    gameCanvas.height = root.innerHeight;
    return gameCq.appendTo('body');
  });

}).call(this);
