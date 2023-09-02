-- custom funcs
function user_changename(name)
  SendVariant({
  	[0] = "OnNameChanged",
      [1] = name,
  }, GetLocal().netid, 100)
end



-- proxy commands
AddHook("OnTextPacket", "commands", function(type, packet)
  if packet:find("/proxy") then
    LogToConsole("ı`6 Proxy Commands >>>`` soon")
    return true
  end
  
  if packet:find("/name (.+)")
    user_changename(packet:match("/name (.+)"))
    LogToConsole("`4[PROXY]`` changed name: "..packet:match("/name (.+)"))
    return true
  end
  
  return false
end)

-- end
