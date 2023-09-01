--[[
	SCRIPT CODED BY git: warfdev (me :3) discord: 9mocha.
	[NOT TESTED]
        supported vers. 4.34 / 4.35 ..
	proxy vers. 1.0
	do not edit anything.
]]--

-- configuration
local proxy = {}
local command = {}
local user = {}
local config = {}
proxy.dev = "9mocha."
proxy.name = "Mochas Proxy"
proxy.version = "v1.0"
proxy.support = "undefined"
proxy.password = "mochasme202010"
proxy.error = "`4[ERROR]`` "
proxy.log = "`2[Mochas Proxy]`` "
proxy.logn = "`6[Mochas Proxy]`` "
proxy.errlogin = "Please login to use the proxy. - /login [password]"


-- main user vars
user.haslogin = false


-- comamnd vars
command.var = {}
command.var.test = "hello"
command.var.invis = false
command.var.gforg = false


-- config vars
config.lang = "en"


-- custom funcs
function errc(str)
  LogToConsole(proxy.error .. str)
end

function plog(str)
  LogToConsole(proxy.log .. str)
end

function plogn(str)
  LogToConsole(proxy.logn .. str)
end

function user_changename(name)
  SendVariant({
  	[0] = "OnNameChanged",
      [1] = name,
  }, GetLocal().netid, 100)
end

function user_oninvis()
  SendVariant({
    [0] = "OnSetClothing",
    [1] = {0,0,0},
    [2] = {0,0,0},
    [3] = {0,0,0},
    [4] = 2,
    [5] = {0, 0, 0},
  },GetLocal().netid,100)
end

function user_deinvis()
  SendVariant({
    [0] = "OnSetClothing",
    [1] = {0,0,0},
    [2] = {0,0,0},
    [3] = {0,0,0},
    [4] = -1,
    [5] = {0, 0, 0},
  },GetLocal().netid,100)
end

function user_skincolor(num)
  SendVariant({
    [0] = "OnSetClothing",
    [1] = {0,0,0},
    [2] = {0,0,0},
    [3] = {0,0,0},
    [4] = num,
    [5] = {0, 0, 0},
  },GetLocal().netid,100)
end

function user_ong4g()
  SendVariant({
    [0] = "OnCountryState",
    [1] = "id|donor",
  },GetLocal().netid)
end

function user_deg4g()
  SendVariant({
    [0] = "OnCountryState",
    [1] = "id|tr",
  },GetLocal().netid)
end

function dropLock(id, amount)
    for _,item in pairs(GetInventory()) do
        if item.id == 242 or item.id == 1796 then
            if item.amount < amount then
                if id == 242 then
                    SendPacketRaw(false,{
                        type = 10,
                        value = 1796,
                    })
                SleepMS(200)
                elseif id == 1796 then
                    SendPacketRaw(false,{
                        type = 10,
                        value = 242,
                    })
                SleepMS(200)
                end
            end
        end
    end
    SendPacket(2, "action|drop\n|itemID|" .. id)
    SendPacket(2, "action|dialog_return\ndialog_name|drop_item\nitemID|" .. id .. "|\ncount|" .. amount)
end

function showHelp()
  SendVariant({
  	[0] = "OnDialogRequest",
      [1] = help,
  }, -1, 100)
end

function sendVisualMessage(str)
  SendVariant({
  	[0] = "OnTalkBubble",
      [1] = str,
  }, -1, 100)
end

function getPlayersName(id)
    for _, g in pairs(GetPlayerlist()) do
        if g.netid == id then
            return g.name
        end
    end
end

function showPlayersDialog()
  playerlist = {}
  for _, i in pairs(GetPlayerList()) do
    table.insert(playerlist, "\nadd_textbox|".. i.name .. "||\n")
  end
  SendVariant({
  	[0] = "OnDialogRequest",
      [1] = "add_label_with_icon|big|Players List|left|2\nadd_spacer|small|\n"..table.concat(playerlist).."\nend_dialog|pplayerspage|Close Page||"
  }, -1, 100)
end

function GetName(id)
    for _, name in pairs(config.playerlist) do
        if name.netid == id then
            return name.name
        end
    end
end



-- DIALOGS
help = [[
set_default_color|`7
add_label_with_icon|big|`2[Mochas Proxy]`` Commands Gazette              |5016|
add_spacer|small|
add_label_with_icon|small|`3Commands:|32|
add_textbox|`6/cname`` [changes your nickname]||
add_textbox|`6/invis`` [you become invisible]||
add_textbox|`6/scolor`` [you change your skin color]||
add_textbox|`6/wd`` [drop wl (if u have)]||
add_textbox|`6/dd`` [drop dl (if u have)]||
add_textbox|`6/bd`` [drop bgl (if u have)]||
add_textbox|`6/g4g`` [enable/disable Grow4Good title]||
add_textbox|`6/players`` [You display the names of the players in the world you are in.]||
add_spacer|small|
add_smalltext|ı Thanks for using `#Mochas Proxy (heart)``|
add_smalltext|Coded by `6@9mocha ``- `3[DISCORD]: ``9mocha.|
add_spacer|big|
add_quick_exit|||
end_dialog|proxymenu|Close||
]]



-- ENGLISH
if config.lang == "en" then
-- PROXY MAIN
AddHook("OnTextPacket", "on_events", function(type, packet)
  clog = "action|input\n|text|"
  
  -- /login command
  if packet:find("/login") then
    if user.haslogin == false then
    str = packet:gsub("action|input\n|text|/login ", "")
    if str == "" then
      errc("Please enter the proxy password - /login [password]")
    else if str == proxy.password then
      user.haslogin = true
      plog("You are logged in! welcome "..GetLocal().name)
      
      -- staff logins tag
      if GetLocal().name == "`wNeoDevils``" then user_changename("`6@Mochas`3"); end -- owner
      
    else
      errc("Invalid password..")
    end
    end
    else
      errc("You are already logged in.")
    end
    return true
  end
  
  
  -- /proxy command
  if packet:find("/proxy") then
    if user.haslogin == true then
      showHelp()
    else
      errc(proxy.errlogin)
    end
    return true
  end
  if packet:find("buttonClicked|listcommand") then
        SendVariant({
            [0] = "OnDialogRequest",
            [1] = help,
        },-1,100)
        return true
  end
  
  
  -- /cname command
  if packet:find("/cname (.+)") then
    if user.haslogin == true then
      user_changename(packet:match("/cname (.+)"))
    else
      errc(proxy.errlogin)
    end
    return true
  end
  
  
  -- /invis command
  if packet:find("/invis") then
    if user.haslogin == true then
      if command.var.invis == false then
        user_oninvis()
        command.var.invis = true
        plog("Invisible mode `2enabled")
      else if command.var.invis == true then
        command.var.invis = false
        user_deinvis()
        plog("Invisible mode `4disabled")
      end
      end
    else
      errc(proxy.errlogin)
    end
    return true
  end
  
  
  -- /scolor command
  if packet:find("/scolor") then
    if user.haslogin == true then
      str = packet:gsub("action|input\n|text|/scolor", "")
      if str == "" then
        errc("Please enter the skin color - /scolor [number]")
      else
        user_skincolor(str)
        plog("Changed skin color `2ID: "..str)
      end
    else
      errc(proxy.errlogin)
    end
    return true
  end
  
  
  -- /wd command
  if packet:find("/wd") then
    if user.haslogin == true then
      str = packet:gsub("action|input\n|text|/wd", "")
      if str == "" then
        errc("Please enter the amount to drop")
      else
        dropLock(242, str)
        plog("dropped `0"..str.." `0World Lock")
      end
    else
      errc(proxy.errlogin)
    end
    return true
  end
  
  
  -- /dd command
  if packet:find("/dd") then
    if user.haslogin == true then
      str = packet:gsub("action|input\n|text|/dd", "")
      if str == "" then
        errc("Please enter the amount to drop")
      else
        dropLock(1796, str)
        plog("dropped `0"..str.." `0Diamond Lock")
      end
    else
      errc(proxy.errlogin)
    end
    return true
  end
  
  
  -- /bd command
  if packet:find("/bd") then
    if user.haslogin == true then
      str = packet:gsub("action|input\n|text|/bd", "")
      if str == "" then
        errc("Please enter the amount to drop")
      else
        dropLock(7188, str)
        plog("dropped `0"..str.." `0Blue Gem Lock")
      end
    else
      errc(proxy.errlogin)
    end
    return true
  end
  
  
  -- /g4g command
  if packet:find("/g4g") then
    if user.haslogin == true then
      if command.var.gforg == false then user_ong4g() command.var.gforg = true end
      if command.var.gforg == true then user_deg4g() command.var.gforg = false end
    else
      errc(proxy.errlogin)
    end
    return true
  end
  
  
  -- /players command
  if packet:find("/players") then
    if user.haslogin == true then
      plog("Showing players in the current world..")
      showPlayersDialog()
    else
      errc(proxy.errlogin)
    end
    return true
  end
  
  
  
  return false
end)
end





-- ON_VARIANT
AddHook("OnVarlist", "variants", function(var)
  if user.haslogin == true then
    varcontent = vlist.v2
    if var.v1 == "OnConsoleMessage" then
      plogn(varcontent)
      return true
    end
  
  
    if var[0] == "OnDialogRequest" and var[1]:find("end_dialog|socialportal") then
        SendVariant({
            [0] = "OnDialogRequest",
            [1] = var[1]:gsub("(add_button|trade_history|`wTrade History``|noflags|0|0|)", "%1\nadd_button|listcommand|`2[Mochas Proxy]`` Commands Gazette|\n"),
        },-1,100)
        return true
    end
  end
end)


SendVariant({
	[0] = "OnDialogRequest",
	[1] = help,
}, -1, 100)
