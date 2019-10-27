@echo off
cd /d %~dp0

xcopy /Y /D /I ..\src\asset ..\local_folder\src\asset
xcopy /Y /D /I ..\src\char ..\local_folder\src\char
xcopy /Y /D /I ..\src\css ..\local_folder\src\css
xcopy /Y /D /I ..\src\css\css ..\local_folder\src\css\css
xcopy /Y /D /I ..\src\css\js ..\local_folder\src\css\js
copy /Y ..\local_index.html ..\local_folder\local_index.html
copy /Y ..\check_scene.js ..\local_folder\check_scene.js
copy /Y ..\common.js ..\local_folder\common.js
copy /Y ..\effect.js ..\local_folder\effect.js
copy /Y ..\global.js ..\local_folder\global.js
copy /Y ..\main.js ..\local_folder\main.js
copy /Y ..\opening_scene.js ..\local_folder\opening_scene.js
copy /Y ..\present_scene.js ..\local_folder\present_scene.js
copy /Y ..\question.js ..\local_folder\question.js
copy /Y ..\quiz_main_scene.js ..\local_folder\quiz_main_scene.js
copy /Y ..\result_scene.js ..\local_folder\result_scene.js
copy /Y ..\scenario.js ..\local_folder\scenario.js
copy /Y ..\share_scene.js ..\local_folder\share_scene.js
copy /Y ..\story_scene.js ..\local_folder\story_scene.js
powershell compress-archive ..\local_folder local.zip