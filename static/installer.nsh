!macro customInstall
  WriteRegStr SHCTX "SOFTWARE\RegisteredApplications" "lunarwolf" "Software\Clients\StartMenuInternet\lunarwolf\Capabilities"

  WriteRegStr SHCTX "SOFTWARE\Classes\lunarwolf" "" "lunarwolf HTML Document"
  WriteRegStr SHCTX "SOFTWARE\Classes\lunarwolf\Application" "AppUserModelId" "lunarwolf"
  WriteRegStr SHCTX "SOFTWARE\Classes\lunarwolf\Application" "ApplicationIcon" "$INSTDIR\lunarwolf.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\lunarwolf\Application" "ApplicationName" "lunarwolf"
  WriteRegStr SHCTX "SOFTWARE\Classes\lunarwolf\Application" "ApplicationCompany" "lunarwolf"      
  WriteRegStr SHCTX "SOFTWARE\Classes\lunarwolf\Application" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"      
  WriteRegStr SHCTX "SOFTWARE\Classes\lunarwolf\DefaultIcon" "DefaultIcon" "$INSTDIR\lunarwolf.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Classes\lunarwolf\shell\open\command" "" '"$INSTDIR\lunarwolf.exe" "%1"'

  WriteRegStr SHCTX "SOFTWARE\Classes\.htm\OpenWithProgIds" "lunarwolf" ""
  WriteRegStr SHCTX "SOFTWARE\Classes\.html\OpenWithProgIds" "lunarwolf" ""

  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\lunarwolf" "" "lunarwolf"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\lunarwolf\DefaultIcon" "" "$INSTDIR\lunarwolf.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\lunarwolf\Capabilities" "ApplicationDescription" "A privacy-focused, extensible and beautiful web browser"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\lunarwolf\Capabilities" "ApplicationName" "lunarwolf"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\lunarwolf\Capabilities" "ApplicationIcon" "$INSTDIR\lunarwolf.exe,0"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\lunarwolf\Capabilities\FileAssociations" ".htm" "lunarwolf"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\lunarwolf\Capabilities\FileAssociations" ".html" "lunarwolf"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\lunarwolf\Capabilities\URLAssociations" "http" "lunarwolf"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\lunarwolf\Capabilities\URLAssociations" "https" "lunarwolf"
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\lunarwolf\Capabilities\StartMenu" "StartMenuInternet" "lunarwolf"
  
  WriteRegDWORD SHCTX "SOFTWARE\Clients\StartMenuInternet\lunarwolf\InstallInfo" "IconsVisible" 1
  
  WriteRegStr SHCTX "SOFTWARE\Clients\StartMenuInternet\lunarwolf\shell\open\command" "" "$INSTDIR\lunarwolf.exe"
!macroend
!macro customUnInstall
  DeleteRegKey SHCTX "SOFTWARE\Classes\lunarwolf"
  DeleteRegKey SHCTX "SOFTWARE\Clients\StartMenuInternet\lunarwolf"
  DeleteRegValue SHCTX "SOFTWARE\RegisteredApplications" "lunarwolf"
!macroend