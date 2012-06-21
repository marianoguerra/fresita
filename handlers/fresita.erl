-module(fresita).
-compile(export_all).
%-export([redirect_editor/1, export_document/1, export_style/1]).

redirect_editor(Req) ->
    couch_httpd:send_redirect(Req, "/fresita/_design/editor/index.html").

python() ->
    case os:type() of
        {win32, _} -> filename:absname("../python/pythonw.exe");
        _ -> "python"
    end.

export() ->
    case os:type() of
        {win32, _} -> "../fop/export.py";
        _ -> "/var/lib/fop/export.py"
    end.

tmp() ->
    case os:type() of
        {win32, _} -> "../tmp/";
        _ -> "/tmp/"
    end.

logpath() ->
    case os:type() of
        {win32, _} -> "../var/log/fresita.log";
        _ -> "/tmp/fresita.log"
    end.

export_document_cmd(UrlPath) ->
    [_Export, Database, InputId, Output, StyleId, Format, _FileName] = string:tokens(UrlPath, "/"),
    python() ++ " " ++ export() ++ " --type id --input " ++ InputId
        ++ " --output " ++ tmp() ++ Output ++ " --style " ++ StyleId ++ " --format "
        ++ Format ++ " --url http://localhost:5984/" ++ Database ++ "/".

export_document(Req) ->
    "/" ++ UrlPath = couch_httpd:path(Req),
    [_Export, _Database, _InputId, Output, _StyleId, Format, _FileName] = string:tokens(UrlPath, "/"),
    Command = export_document_cmd(UrlPath),
    log(UrlPath),
    log(Command),
    os:cmd(Command),
    couch_httpd:serve_file(Req, Output ++ "." ++ Format, tmp()).

export_style_cmd(UrlPath) ->
    [_Style, Database, StyleId] = string:tokens(UrlPath, "/"),
    python() ++ " " ++ export() ++ " --type style --style " ++ StyleId ++
        " --url http://localhost:5984/" ++ Database ++ "/>" ++ tmp() ++ StyleId.

export_style(Req) ->
    "/" ++ UrlPath = couch_httpd:path(Req),
    [_Export, _Database, _InputId, _Output, StyleId, _Format, _FileName] = string:tokens(UrlPath, "/"),
    os:cmd(export_style_cmd(UrlPath)),
    couch_httpd:serve_file(Req, StyleId, tmp()).

log(Text) ->
    {ok, Device} = file:open(logpath(), [append]),
    file:write(Device, Text ++ "\n").
